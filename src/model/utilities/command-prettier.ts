export interface ICommandPrettierOptions {
  leadingBlankLines: number;
  trailingBlankLines: number;
  offset: string;
}

export function getCommandPrettierOptions(command: string | undefined): ICommandPrettierOptions {
  const options: ICommandPrettierOptions = {
    leadingBlankLines: 0,
    trailingBlankLines: 0,
    offset: '',
  };
  if (command) {
    const lines = command.split(/\r?\n/);
    options.leadingBlankLines = lines.findIndex((l) => l.trim() !== '');
    options.trailingBlankLines = lines.slice().reverse().findIndex((l) => l.trim() !== '');
    const nonBlankLines = lines.filter((l) => l.trim() !== '');
    const first = nonBlankLines.find((l) => l.trim() !== '') || '';
    const e = /^(\s*)/.exec(first);
    let offset = e && e[1] ? e[1] : '';
    if (nonBlankLines.some((l) => !l.startsWith(offset))) {
      offset = '';
    }
    options.offset = offset;
  }
  return options;
}

export function makePretty(
  command: string | undefined,
): string | undefined;
export function makePretty(
  command: string | undefined,
  options: ICommandPrettierOptions,
): string | undefined;
export function makePretty(
  command: string | undefined,
  options?: ICommandPrettierOptions,
): string | undefined {
  if (command === undefined) {
    return undefined;
  }
  const prettierOptions = options ?? getCommandPrettierOptions(command);
  return command
    .split(/\r?\n/)
    .slice(
      prettierOptions.leadingBlankLines,
      prettierOptions.trailingBlankLines > 0
        ? -prettierOptions.trailingBlankLines
        : undefined,
    )
    .map((line) => line.slice(prettierOptions.offset.length))
    .join('\n');
}

export function makeOriginal(
  prettyCommand: string | undefined,
  options: ICommandPrettierOptions,
): string | undefined {
  if (!prettyCommand) {
    return undefined;
  }
  return []
    .concat((new Array(options.leadingBlankLines)).fill(''))
    .concat(
      prettyCommand
        .split(/\r?\n/)
        .map((line) => options.offset.concat(line))
        .join('\n'),
    )
    .concat((new Array(options.trailingBlankLines)).fill(''))
    .join('\n');
}
