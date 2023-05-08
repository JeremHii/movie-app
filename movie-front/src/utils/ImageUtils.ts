import ColorThief from "colorthief";

export class ImageUtils {
  static async getDominantColor(img: HTMLImageElement): Promise<string> {
    return new Promise<string>((resolve) => {
      try {
        const colorThief = new ColorThief();
        if (img.complete) {
          resolve(ImageUtils.rgbToHex(...colorThief.getColor(img)));
        } else {
          img.addEventListener("load", () => {
            resolve(ImageUtils.rgbToHex(...colorThief.getColor(img)));
          });
        }
      } catch {
        resolve("#212");
      }
    });
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}
