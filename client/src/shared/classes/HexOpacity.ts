export class HexOpacity {

  public static HexToOpacity(hex: string) {
    const isShortRGB = hex.length === 4; // #RGB
    const isFullRGB = hex.length === 7; // #RRGGBB
  
    if (isShortRGB || isFullRGB) return 1;

    const alphaHex = hex.slice(-2);
    const alphaDecimal = parseInt(alphaHex, 16);

    return Math.round((alphaDecimal / 255) * 100) / 100;
  }

  public static OpacityToHex(opacity: number): string {
    return Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
  }
  
  public static SplitHexOpacity(hex: string): { color: string; opacity: number } {
    const isShortRGB = hex.length === 4; // #RGB
    const isFullRGB = hex.length === 7; // #RRGGBB
  
    if (isShortRGB || isFullRGB) {
      return { color: hex, opacity: 1 };
    }
  
    const color = hex.slice(0, 7);
    const opacity = this.HexToOpacity(hex);
  
    return { color, opacity };
  }
  
}