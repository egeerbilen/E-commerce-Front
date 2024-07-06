import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToImage'
})
export class ByteToImagePipe implements PipeTransform {
  /**
   * Transform byte data to image.
   * @param value Byte.
   * @returns Img.
   */
  public transform(value: string): string {
    if (!value) {
      return '';
    }
    return 'data:image/png;base64,' + value;
  }
}
