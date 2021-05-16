import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input('appHover') className: string;
  defaultHoverClassName = 'app-hover';

  @Input() effectOnSelf = true;
  @Input() affectElement: string;

  @HostBinding('class')
  hoverClass = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover')
  mouseOver(): void {
    if (this.effectOnSelf) {
      this.hoverClass = this.className || this.defaultHoverClassName;
    } else {
      const el = this.el.nativeElement.querySelector(this.affectElement);
      if (el) {
        this.renderer.addClass(el, this.className);
      }
    }
  }

  @HostListener('mouseleave')
  mouseLeave(): void {
    if (this.effectOnSelf) {
      this.hoverClass = '';
    } else {
      const el = this.el.nativeElement.querySelector(this.affectElement);
      if (el) {
        this.renderer.removeClass(el, this.className);
      }
    }
  }
}
