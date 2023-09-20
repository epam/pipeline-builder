import WdlEntity from '../base/wdl-entity';
import {
  ContextTypes,
  IImport,
  IImportOptions,
  ImportDepthSymbol,
  IStructAlias,
  IStructAliasOptions,
  IWdlDocument,
  WdlEvent,
} from '../types';
import removeQuotes from '../utilities/remove-quotes';
import parseURL from '../utilities/parse-url';
import { getContent, ident } from '../utilities/wdl-generation';
import reduceStructAliases from '../utilities/reduce-struct-aliases';

class Import extends WdlEntity<ContextTypes.import> implements IImport {
  private readonly _source: string;

  private _importedDocument: IWdlDocument | undefined;

  private _structs: IStructAlias[];

  private readonly _structAliases: IStructAliasOptions[];

  static deserialize(options: IImportOptions): Import {
    return new Import(options);
  }

  constructor(options: IImportOptions) {
    const {
      source,
      structs = [],
    } = options || {};
    if (!source) {
      throw new Error('Import source not specified');
    }
    const url = removeQuotes(source);
    const {
      name,
    } = parseURL(url);
    super(ContextTypes.import, {
      name,
      ...(options || {}),
    });
    this._source = url;
    this._structs = [];
    this._structAliases = structs.slice();
  }

  get source(): string {
    return this._source;
  }

  get importedDocument(): IWdlDocument | undefined {
    return this._importedDocument;
  }

  get structs(): IStructAlias[] {
    return this._structs;
  }

  get globalStructs(): IStructAlias[] {
    return reduceStructAliases(
      this.structs,
      this.importedDocument ? this.importedDocument.globalStructs : [],
    );
  }

  getAliases(...type): string[] {
    const types = type.length === 0 ? Object.values(ContextTypes) : type;
    const withoutStructs = types.filter((t) => t !== ContextTypes.struct);
    const mapAlias = (alias: string): string => (
      this.alias ? `${this.alias}.${alias}` : alias
    );
    const mapStruct = (struct: string): string => {
      const structAlias = this._structAliases.find((o) => o.struct === struct);
      if (structAlias) {
        return structAlias.alias;
      }
      return struct;
    };
    return []
      .concat(
        this.importedDocument
          ? this.importedDocument
            .getAliases(...withoutStructs).map(mapAlias)
          : [],
      )
      .concat(
        this.importedDocument && types.includes(ContextTypes.struct)
          ? this.importedDocument
            .getAliases(ContextTypes.struct).map(mapStruct)
          : [],
      );
  }

  async load(): Promise<IWdlDocument | undefined> {
    const { document } = this;
    if (!document) {
      throw new Error('Parent document is missing');
    }
    if (!this.source) {
      throw new Error('Import source is not provided');
    }
    if (this._importedDocument) {
      return this._importedDocument;
    }
    try {
      this._importedDocument = await document.project.loadDocumentByURI({
        uri: this.source,
        baseURI: document.uri,
        [ImportDepthSymbol]: document[ImportDepthSymbol] + 1,
      });
      this._structs = [];
      this._importedDocument.globalStructs.forEach((struct) => {
        const alias = this._structAliases.find((o) => o.alias === struct.alias)
        || this._structAliases.find((o) => o.struct === struct.struct.name);
        if (alias) {
          this._structs.push({
            alias: alias.alias,
            struct: struct.struct,
          });
        } else {
          this._structs.push(struct);
        }
      });
      await this._importedDocument.loadImports();
      this._importedDocument.on(WdlEvent.treeChanged, this.importedDocumentTreeChanged, this);
      document.spread(WdlEvent.treeChanged, this);
      return this._importedDocument;
    } catch (error) {
      console.warn(`Error loading import "${this.source}": ${error.message}`);
      return undefined;
    }
  }

  private importedDocumentTreeChanged() {
    const { document, importedDocument } = this;
    if (document) {
      document.spread(WdlEvent.treeChanged, importedDocument);
    }
  }

  generateWdl(): string {
    if (this.validate(true)) {
      return getContent([
        this.alias ? `import "${this.source}" as ${this.alias}` : `import "${this.source}"`,
        ident(
          ...this._structAliases.map((a) => `alias ${a.struct} as ${a.alias}`),
        ),
      ]);
    }
    return undefined;
  }
}

export default Import;
