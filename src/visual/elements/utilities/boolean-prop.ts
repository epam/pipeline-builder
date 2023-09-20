export default function booleanProp(value: boolean | undefined, defaultValue = false): boolean {
  return typeof value === 'boolean' ? value : defaultValue;
}
