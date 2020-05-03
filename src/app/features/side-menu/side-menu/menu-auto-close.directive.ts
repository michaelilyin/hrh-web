import { Directive, HostListener } from '@angular/core';
import { MenuMode, SideMenuShellComponent } from '../side-menu-shell/side-menu-shell.component';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[hrhMenuAutoClose]'
})
export class MenuAutoCloseDirective {
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
