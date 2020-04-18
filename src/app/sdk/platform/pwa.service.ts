import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate } from '@angular/service-worker';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  readonly updateAvailable$ = this.swUpdate.available.pipe(mapTo(true), startWith(false));

  constructor(private readonly platform: Platform, private readonly swUpdate: SwUpdate) {}

  get pwa(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}
