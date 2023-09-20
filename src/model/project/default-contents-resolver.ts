export default async function defaultContentsResolver(
  uri: string,
): Promise<string> {
  const response = await fetch(uri);
  if (!response.ok) {
    const status = response.statusText || `Error ${response.status}`;
    throw new Error(`${uri}: ${status}`);
  }
  return response.text();
}
