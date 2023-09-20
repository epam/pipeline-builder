const ESCAPE_CHARACTERS: string[] = ['.', '-', '*', '?', '+', '^', '$', '(', ')', '[', ']', '{', '}'];

export { ESCAPE_CHARACTERS };

export default function escapeRegExp(string: string, characters = ESCAPE_CHARACTERS): string {
  let result = string;
  characters.forEach((character) => {
    result = result
      .replace(new RegExp(`\\${character}`, 'g'), `\\${character}`);
  });
  return result;
}
