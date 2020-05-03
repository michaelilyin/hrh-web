import { Injectable } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { SideMenuContext } from './side-menu.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';

@Injectable()
export class SideMenuShellService {
  private _sideMenuPortals$ = new BehaviorSubject<TemplatePortal<SideMenuContext>[]>([]);

  public readonly sideMenuPortals$ = this._sideMenuPortals$.pipe(
    debounceTime(50), // portals can be changed during view initialization and we need to wait full view initialization
    shareReplay(1)
  );

  private readonly sideMenuPortalsMap = new Map<string, TemplatePortal<SideMenuContext>>();

  constructor() {}

  addSideMenu(key: string, portal: TemplatePortal<SideMenuContext>) {
    this.sideMenuPortalsMap.set(key, portal);
    this.notifyPortalsUpdated();
  }

  removeSideMenu(key: string) {
    this.sideMenuPortalsMap.delete(key);
    this.notifyPortalsUpdated();
  }

  private notifyPortalsUpdated() {
    this._sideMenuPortals$.next(Array.from(this.sideMenuPortalsMap.values()));
  }
}
