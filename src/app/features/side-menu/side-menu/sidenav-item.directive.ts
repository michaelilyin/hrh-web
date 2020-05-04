import { Directive, HostListener } from '@angular/core';
import { MenuMode, SideMenuShellComponent } from '@hrh/side-menu/side-menu-shell/side-menu-shell.component';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[mat-list-item][hrhSidenavItem]'
})
export class SidenavItemDirective {
  constructor(private shellComponent: SideMenuShellComponent) {}

  // tslint:disable-next-line:no-unsafe-any
  @HostListener('click')
  handleHostClick() {
    this.shellComponent.mode$.pipe(first()).subscribe((mode) => {
      if (mode === MenuMode.Over) {
        this.shellComponent.toggleMenuOpen(false);
      }
    });
  }
}
