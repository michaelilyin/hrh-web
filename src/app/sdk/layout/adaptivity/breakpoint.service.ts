import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';
import { BreakpointName } from '@hrh/sdk/layout/adaptivity/breakpoint.model';

interface BreakpointState {
  name: BreakpointName;
  matches: boolean;
}

export interface CurrentViewportMode {
  readonly mode: ReadonlySet<BreakpointName>;
  readonly handset: boolean;
  readonly tablet: boolean;
  readonly web: boolean;
  readonly portrait: boolean;
  readonly landscape: boolean;

  has(...bps: BreakpointName[]): boolean;
}

class CurrentViewportModeImpl implements CurrentViewportMode {
  mode = new Set<BreakpointName>();

  get handset(): boolean {
    return (
      this.mode.has(BreakpointName.HandsetPortrait) ||
      this.mode.has(BreakpointName.HandsetLandscape) ||
      this.mode.has(BreakpointName.Handset)
    );
  }

  get tablet(): boolean {
    return (
      this.mode.has(BreakpointName.TabletPortrait) ||
      this.mode.has(BreakpointName.TabletLandscape) ||
      this.mode.has(BreakpointName.Tablet)
    );
  }

  get web(): boolean {
    return (
      this.mode.has(BreakpointName.WebPortrait) ||
      this.mode.has(BreakpointName.WebLandscape) ||
      this.mode.has(BreakpointName.Web)
    );
  }

  get portrait(): boolean {
    return (
      this.mode.has(BreakpointName.HandsetPortrait) ||
      this.mode.has(BreakpointName.TabletPortrait) ||
      this.mode.has(BreakpointName.WebPortrait)
    );
  }

  get landscape(): boolean {
    return (
      this.mode.has(BreakpointName.HandsetLandscape) ||
      this.mode.has(BreakpointName.TabletLandscape) ||
      this.mode.has(BreakpointName.WebLandscape)
    );
  }

  has(...bps: BreakpointName[]): boolean {
    return bps.some((bp) => this.mode.has(bp));
  }
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  readonly current$: Observable<CurrentViewportMode>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    const all$$ = [
      this.observe(BreakpointName.Handset),
      this.observe(BreakpointName.HandsetPortrait),
      this.observe(BreakpointName.HandsetLandscape),
      this.observe(BreakpointName.Tablet),
      this.observe(BreakpointName.TabletPortrait),
      this.observe(BreakpointName.TabletLandscape),
      this.observe(BreakpointName.Web),
      this.observe(BreakpointName.WebPortrait),
      this.observe(BreakpointName.WebLandscape)
    ];

    this.current$ = merge(...all$$).pipe(
      scan((acc, state) => {
        if (state.matches) {
          acc.mode.add(state.name);
        } else {
          acc.mode.delete(state.name);
        }
        return acc;
      }, new CurrentViewportModeImpl()),
      shareReplay(1)
    );
  }

  private observe(name: BreakpointName): Observable<BreakpointState> {
    return this.breakpointObserver.observe(Breakpoints[name]).pipe(
      map((st) => ({
        name,
        matches: st.matches
      }))
    );
  }
}
