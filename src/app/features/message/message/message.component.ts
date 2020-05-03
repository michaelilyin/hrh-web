import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';
import { mixinColor } from '@angular/material/core';

class MessageComponentBase implements HasElementRef {
  constructor(public _elementRef: ElementRef) {}
}

const _ColoredMessageComponentMixinBase = mixinColor(MessageComponentBase);

@Component({
  selector: 'hrh-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['color'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent extends _ColoredMessageComponentMixinBase implements OnInit {
  constructor(_elementRef: ElementRef, private readonly renderer: Renderer2) {
    super(_elementRef);
  }

  ngOnInit(): void {
    this.renderer.addClass(this._elementRef.nativeElement, 'message');
  }
}
