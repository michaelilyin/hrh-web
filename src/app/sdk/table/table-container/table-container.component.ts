import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrh-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent implements OnInit, OnDestroy {
  private bpSub = Subscription.EMPTY;

  constructor(
    private readonly breakpointService: BreakpointService,
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.renderer2.addClass(this.elementRef.nativeElement, 'table-container');

    this.bpSub = this.breakpointService.current$.subscribe((bp) => {
      const cardView = bp.has(BreakpointName.Handset, BreakpointName.TabletPortrait);
      if (cardView) {
        this.renderer2.addClass(this.elementRef.nativeElement, 'card-view');
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'card-view');
      }
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.bpSub.unsubscribe();
  }
}
