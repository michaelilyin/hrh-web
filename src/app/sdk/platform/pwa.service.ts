import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  constructor(private readonly platform: Platform) {}

  isPwa(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}
