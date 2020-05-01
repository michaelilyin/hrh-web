import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hrhShellBeforeTitle]'
})
export class ShellBeforeTitleDirective {}

@Directive({
  selector: '[hrhShellAfterTitle]'
})
export class ShellAfterTitleDirective {}

@Directive({
  selector: '[hrhShellAtTheEnd]'
})
export class ShellAtTheEndDirective {}

@Directive({
  selector: '[hrhShellContent]'
})
export class ShellContentDirective implements OnInit {
  constructor(private readonly elementRef: ElementRef, private readonly renderer2: Renderer2) {}

  ngOnInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'box-sizing', 'border-box');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'height', '100%');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'max-height', '100%');
  }
}
