import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  readonly mode$: Observable<{ [p: string]: boolean }>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    const xsmall$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(map((st) => ['xsmall', st.matches]));
    const small$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(map((st) => ['small', st.matches]));
    const medium$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Medium)
      .pipe(map((st) => ['medium', st.matches]));
    const large$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Large)
      .pipe(map((st) => ['large', st.matches]));
    const xlarge$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Large)
      .pipe(map((st) => ['xlarge', st.matches]));
    const handset$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((st) => ['handset', st.matches]));
    const handsetL$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.HandsetLandscape)
      .pipe(map((st) => ['handset-l', st.matches]));
    const handsetP$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((st) => ['handset-p', st.matches]));
    const tablet$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Tablet)
      .pipe(map((st) => ['tablet', st.matches]));
    const tabletL$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.TabletLandscape)
      .pipe(map((st) => ['tablet-l', st.matches]));
    const tabletP$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.TabletPortrait)
      .pipe(map((st) => ['tablet-p', st.matches]));
    const web$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.Web)
      .pipe(map((st) => ['web', st.matches]));
    const webL$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.WebLandscape)
      .pipe(map((st) => ['web-l', st.matches]));
    const webP$: Observable<[string, boolean]> = this.breakpointObserver
      .observe(Breakpoints.WebPortrait)
      .pipe(map((st) => ['web-p', st.matches]));

    const all$$ = [
      xsmall$,
      small$,
      medium$,
      large$,
      xlarge$,
      handset$,
      handsetL$,
      handsetP$,
      tablet$,
      tabletL$,
      tabletP$,
      web$,
      webL$,
      webP$
    ];

    this.mode$ = merge(...all$$).pipe(
      scan((acc, [prop, value]) => {
        return {
          ...acc,
          [prop]: value
        };
      }, {} as { [p: string]: boolean }),
      shareReplay(1)
    );
  }
}
