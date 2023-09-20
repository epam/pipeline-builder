import { IProjectConfiguration, TURIContentsResolver, WdlVersion } from '../types';

class ProjectConfiguration implements IProjectConfiguration {
  static default: ProjectConfiguration = new ProjectConfiguration({
    importRecursionDepth: 3,
    debug: false,
  });

  private _wdlVersion: WdlVersion;

  private _baseURI: string | undefined;

  private _contentsResolver: TURIContentsResolver | undefined;

  private _importRecursionDepth: number;

  debug: boolean;

  constructor();
  constructor(configuration: IProjectConfiguration);
  constructor(configuration: IProjectConfiguration = undefined) {
    this._wdlVersion = configuration?.wdlVersion ?? WdlVersion.v1_1;
    this._baseURI = configuration ? configuration.baseURI : undefined;
    this._importRecursionDepth = configuration && configuration.importRecursionDepth >= 0
      ? configuration.importRecursionDepth
      : Infinity;
    this._contentsResolver = configuration
      ? configuration.contentsResolver
      : undefined;
    this.debug = configuration && !!configuration.debug;
  }

  get wdlVersion(): WdlVersion {
    return this._wdlVersion;
  }

  get baseURI(): string | undefined {
    return this._baseURI;
  }

  set baseURI(uri: string | undefined) {
    this._baseURI = uri;
  }

  get importRecursionDepth(): number {
    return this._importRecursionDepth;
  }

  set importRecursionDepth(depth: number | undefined) {
    this._importRecursionDepth = depth || Infinity;
  }

  get contentsResolver(): TURIContentsResolver | undefined {
    return this._contentsResolver;
  }

  set contentsResolver(resolver: TURIContentsResolver | undefined) {
    this._contentsResolver = resolver;
  }
}

export default ProjectConfiguration;
