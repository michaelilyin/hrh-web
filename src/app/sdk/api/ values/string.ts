export function writeUrlString(value: string | undefined): string;
export function writeUrlString(value: (string | undefined)[]): string[];
export function writeUrlString(value: string | undefined | (string | undefined)[]): string | string[] {
  if (value == undefined) {
    return '';
  }
  if (Array.isArray(value)) {
    return value.map((v) => writeUrlString(v)).filter((v) => v !== '');
  }
  return value.trim();
}

export function readUrlString(value: string | undefined | null): string | undefined {
  if (value == undefined) {
    return undefined;
  }
  const trimmied = value.trim();
  if (trimmied === '') {
    return undefined;
  }
  return trimmied;
}
