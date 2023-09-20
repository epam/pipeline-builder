import escapeRegExp from './escape-reg-exp';

function generateName(name: string, occupiedNames: string[] = []): string {
  const n = name || 'name';
  const regExp = new RegExp(`^${escapeRegExp(n)}(_(\\d)+)?$`, 'i');
  const identifiers = occupiedNames
    .map((occupiedName) => regExp.exec(occupiedName))
    .filter((e) => e)
    .map((e) => Number(e[2] || '0'));
  if (identifiers.length === 0) {
    return n;
  }
  const next = identifiers.reduce((max, current) => (max < current ? current : max), 0) + 1;
  return `${n}_${next}`;
}

export default generateName;
