export function writeUrlBool(value: boolean | undefined): string;
export function writeUrlBool(value: (boolean | undefined)[]): string[];
export function writeUrlBool(value: boolean | undefined | (boolean | undefined)[]): string | string[] {
  if (value == undefined) {
    return '';
  }
  if (Array.isArray(value)) {
    return value.map((v) => writeUrlBool(v)).filter((v) => v !== '');
  }
  return value ? 'true' : 'false';
}

export function readUrlBool(value: string | undefined | null): boolean | undefined {
  if (value == undefined) {
    return undefined;
  }
  const trimmied = value.trim();
  if (trimmied === '') {
    return undefined;
  }
  return trimmied === 'true';
}
