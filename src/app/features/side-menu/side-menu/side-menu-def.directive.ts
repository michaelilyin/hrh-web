import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { SideMenuShellComponent } from '../side-menu-shell/side-menu-shell.component';
import { SideMenuContext } from '../side-menu-shell/side-menu.model';
import { SideMenuShellService } from '../side-menu-shell/side-menu-shell.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[hrhSideMenuDef]'
})
export class SideMenuDefDirective implements OnInit, OnDestroy {
  @Input('hrhSideMenuDef') key!: string;

  private context: SideMenuContext = {
    expanded: true
  };

  private expandedSub = Subscription.EMPTY;

  constructor(
    private readonly templateRef: TemplateRef<SideMenuContext>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly sideMenuShellService: SideMenuShellService,
    private readonly sideMenuShellComponent: SideMenuShellComponent,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Maybe use not current view container but shell
    this.expandedSub = this.sideMenuShellComponent.menuExpanded$.subscribe((expanded) => {
      this.context.expanded = expanded;
      this.changeDetectorRef.markForCheck();
    });
    const portal = new TemplatePortal(this.templateRef, this.viewContainerRef, this.context);
    this.sideMenuShellService.addSideMenu(this.key, portal);
  }

  ngOnDestroy(): void {
    this.sideMenuShellService.removeSideMenu(this.key);
    this.expandedSub.unsubscribe();
  }
}
