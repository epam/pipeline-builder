/**
 * Removes leading & trailing quotes from string, i.e. `"some string"` -> `some string`
 * @param {string} string
 * @returns {string}
 */
function removeQuotes(string: string): string {
  const [, , o1, o2, o3] = /^("(.+)"|'(.+)'|`(.+)`)$/i.exec(string) || [];
  return o1 || o2 || o3 || string;
}

export default removeQuotes;
