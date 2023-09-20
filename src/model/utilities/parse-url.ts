import { SupportedFormats } from '../types';
import parseFormat from './parse-format';

export default function parseURL(url: string): {
  url: string,
  name: string,
  format: SupportedFormats,
} {
  const path = url.split('?')[0].split(/[\\/]/).pop();
  let name = path;
  let format = SupportedFormats.wdl;
  const formatsString = Object.values(SupportedFormats).join('|');
  const e = (new RegExp(`^(.+)\\.(${formatsString})$`, 'i')).exec(path);
  if (e && e[1] && e[2] && e[1].length && e[2].length) {
    // eslint-disable-next-line prefer-destructuring
    name = e[1];
    format = parseFormat(e[2]);
  }
  return {
    url,
    name,
    format,
  };
}
