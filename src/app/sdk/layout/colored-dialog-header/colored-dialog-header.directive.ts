import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';

class ColoredDialogHeaderBase {
  constructor(public _elementRef: ElementRef) {}
}

const _ColoredDialogHeaderMixinBase = mixinColor(ColoredDialogHeaderBase);

@Directive({
  selector: '[hrhColoredDialogHeader]',
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['color']
})
export class ColoredDialogHeaderDirective extends _ColoredDialogHeaderMixinBase implements CanColor, OnInit {
  constructor(_elementRef: ElementRef, private readonly renderer: Renderer2) {
    super(_elementRef);
  }

  ngOnInit(): void {
    this.renderer.addClass(this._elementRef.nativeElement, 'dialog-colored-header');
  }
}
