import { SupportedFormats } from '../types';

export default function parseFormat(format: string): SupportedFormats {
  if (!format) {
    throw new Error('Format not specified');
  }
  switch (format.toLowerCase()) {
    case 'wdl':
      return SupportedFormats.wdl;
    default:
      throw new Error(`Format "${format.toLowerCase()}" not supported`);
  }
}
