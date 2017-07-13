// @flow
export default function ignoreSlash(s: string): string {
  return s.replace(/\//g, '');
}
