import { Directive, HostListener } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { MenuMode, ShellComponent } from '../../shell/shell.component';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[hrhMenuAutoClose]'
})
export class MenuAutoCloseDirective {
  // TODO: replace shell component with menu controller
  constructor(private shellComponent: ShellComponent) {}

  // tslint:disable-next-line:no-unsafe-any
  @HostListener('click')
  handleHostClick() {
    this.shellComponent.mode$.pipe(first()).subscribe((mode) => {
      if (mode === MenuMode.Over) {
        this.shellComponent.menuOpenChange(false);
      }
    });
  }
}