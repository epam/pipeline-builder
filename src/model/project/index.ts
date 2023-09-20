import {
  IAction,
  ImportDepthSymbol,
  IProject,
  IProjectConfiguration, ITask,
  IWdlDocument,
  IWdlDocumentOptions, IWdlGenerationResult, IWorkflow,
  SupportedFormats,
  WdlContentsOptions,
  WdlLoadOptions,
} from '../types';
import WdlDocument from '../document';
import ProjectConfiguration from './configuration';
import generateName from '../utilities/generate-name';
import parse from '../../parser/WDL/antlr4';
import defaultContentsResolver from './default-contents-resolver';
import parseURL from '../utilities/parse-url';
import { measure, measureAsync } from '../utilities/measure';

const parsers: Map<SupportedFormats, (wdl: string) => IWdlDocumentOptions> = new Map();
parsers.set(SupportedFormats.wdl, parse);

class Project
  extends ProjectConfiguration
  implements IProject {
  static default: Project = new Project(ProjectConfiguration.default);

  private _documents: IWdlDocument[];

  private _urlsCache: Map<string, Promise<IWdlDocument>>;

  constructor();
  constructor(configuration: IProjectConfiguration);
  constructor(configuration: IProjectConfiguration = undefined) {
    super(configuration);
    this._documents = [];
    this._urlsCache = new Map<string, Promise<IWdlDocument>>();
  }

  destroy() {
    this._documents = undefined;
    this._urlsCache = undefined;
  }

  get documents(): IWdlDocument[] {
    return this._documents;
  }

  private getURL(
    relativeURI: string,
    base?: string,
  ): { url: string, name: string, format: SupportedFormats } {
    if (!relativeURI || !relativeURI.length) {
      throw new Error('URI not provided');
    }
    const baseURI = base || this.baseURI;
    if (!baseURI || !baseURI.length) {
      return parseURL(relativeURI);
    }
    try {
      const url = new URL(relativeURI, baseURI);
      return parseURL(url.href);
    } catch (e) {
      throw new Error(`Couldn't build URI for base "${baseURI}" and relative "${relativeURI}": ${e.message}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateWdl(content: string): {
    error?: string;
    success: boolean;
  } {
    try {
      const parser = parsers.get(SupportedFormats.wdl);
      console.log(parser(content));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  generateWdl(document: IWdlDocument): IWdlGenerationResult;
  generateWdl(workflow: IWorkflow): IWdlGenerationResult;
  generateWdl(task: ITask): IWdlGenerationResult;
  generateWdl(action: IAction): IWdlGenerationResult;
  generateWdl(entity: IAction | IWdlDocument): IWdlGenerationResult {
    let content: string | undefined;
    try {
      content = entity.generateWdl();
      const {
        error,
        success,
      } = this.validateWdl(content);
      return {
        error,
        success,
        content,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        content,
      };
    }
  }

  async loadDocumentByURI(uri: string): Promise<IWdlDocument>;
  async loadDocumentByURI(options: WdlLoadOptions): Promise<IWdlDocument>;
  async loadDocumentByURI(uri: string, depth: number): Promise<IWdlDocument>;
  async loadDocumentByURI(uri: string | WdlLoadOptions, depth: number = 0): Promise<IWdlDocument> {
    let uriValue: string;
    let baseUri: string | undefined;
    let importDepth: number = depth || 0;
    if (typeof uri === 'string') {
      uriValue = uri;
    } else {
      const {
        uri: u,
        baseURI: b,
        [ImportDepthSymbol]: i = depth,
      } = uri;
      uriValue = u;
      baseUri = b;
      importDepth = i;
    }
    const {
      url,
      name,
      format,
    } = this.getURL(uriValue, baseUri);
    if (this._urlsCache.has(url)) {
      return this._urlsCache.get(url);
    }
    if (importDepth > 1 && importDepth > this.importRecursionDepth) {
      return Promise.reject(
        new Error(`Document loading cancelled because of the recursion depth (allowed: ${this.importRecursionDepth}, current: ${importDepth}): ${url}`),
      );
    }
    const resolver = this.contentsResolver || defaultContentsResolver;
    if (this.debug) {
      console.log('Loading document:');
      if (uriValue === url) {
        console.log('\turl:', url);
      } else {
        console.log('\turi:', uriValue);
        console.log('\turl:', url);
      }
    }
    const cacheItem: Promise<IWdlDocument> = new Promise((resolve, reject) => {
      resolver(url)
        .then((contents) => this.loadDocumentByContents({
          uri: url,
          contents,
          name,
          format,
          [ImportDepthSymbol]: importDepth,
        }))
        .then(resolve)
        .catch(reject);
    });
    this._urlsCache.set(url, cacheItem);
    return cacheItem;
  }

  async loadDocumentByContents(contents: string): Promise<IWdlDocument>;
  async loadDocumentByContents(contents: WdlContentsOptions): Promise<IWdlDocument>;
  async loadDocumentByContents(contents: string | WdlContentsOptions): Promise<IWdlDocument> {
    let wdl: string = '';
    let name = generateName('WdlDocument', this.documents.map((document) => document.name));
    let format = SupportedFormats.wdl;
    let depth = 0;
    let uri: string | undefined;
    if (typeof contents === 'string') {
      wdl = contents;
    } else {
      wdl = contents.contents;
      name = contents.name || name;
      format = contents.format || SupportedFormats.wdl;
      depth = contents[ImportDepthSymbol] || 0;
      uri = contents.uri;
    }
    if (!parsers.has(format)) {
      throw new Error(`Parser not found for format "${format}"`);
    }
    const parser = parsers.get(format);
    return measureAsync(`Loading ${name}`, async () => {
      const options: IWdlDocumentOptions = measure(
        `Parsing ${name}`,
        () => parser(wdl),
        this.debug,
      );
      const document = measure(
        `Building ${name}`,
        () => new WdlDocument({
          ...options,
          uri,
          [ImportDepthSymbol]: depth,
          name,
          project: this,
        }),
        this.debug,
      );
      await measureAsync(
        `Loading imports for ${name}`,
        document.loadImports.bind(document),
        this.debug,
      );
      this._documents.push(document);
      return document;
    }, this.debug);
  }
}

export default Project;
