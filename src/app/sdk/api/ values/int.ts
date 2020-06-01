export function writeUrlInt(value: number | undefined): string;
export function writeUrlInt(value: (number | undefined)[]): string[];
export function writeUrlInt(value: number | undefined | (number | undefined)[]): string | string[] {
  if (value == undefined) {
    return '';
  }
  if (Array.isArray(value)) {
    return value.map((v) => writeUrlInt(v)).filter((v) => v !== '');
  }
  return value.toString(10);
}

export function readUrlInt(value: string | undefined | null): number | undefined {
  if (value == undefined) {
    return undefined;
  }
  const trimmied = value.trim();
  if (trimmied === '') {
    return undefined;
  }
  return parseInt(trimmied, 10);
}
