import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightCategory]'
})
export class HighlightCategoryDirective implements AfterViewInit {
  /**
   * Constructor.
   * @param _el El.
   * @param _renderer Renderer2.
   */
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2
  ) {}

  /**
   * NgAfterViewInit.
   */
  public ngAfterViewInit(): void {
    // İlk elemanı seç ve mavi yap
    const firstElement = this._el.nativeElement.parentNode?.children[0];
    if (firstElement) {
      this._renderer.addClass(firstElement, 'active');
    }
  }

  /**
   * HostListener.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @HostListener('click') public onClick() {
    const siblings = this._el.nativeElement.parentNode.children;
    for (const element of siblings) {
      this._renderer.removeClass(element, 'active');
    }

    this._renderer.addClass(this._el.nativeElement, 'active');
  }
}
