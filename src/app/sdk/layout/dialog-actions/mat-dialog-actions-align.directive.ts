import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line directive-selector
  selector: 'mat-dialog-actions[align]'
})
export class MatDialogActionsAlignDirective implements OnInit {
  @Input() align!: 'left' | 'right';

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'flex-end');
  }
}
