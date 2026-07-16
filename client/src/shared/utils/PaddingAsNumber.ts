export function PaddingAsNumber(padding: string): number {
  return Number(padding.slice(0, padding.indexOf("px") ?? padding.length));
}