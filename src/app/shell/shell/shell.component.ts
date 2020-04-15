import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestHttpService } from './test-http.service';
import { BreakpointService } from '@hrh/sdk/layout/adaptivity/breakpoint.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hrh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  readonly test$ = this.testHttpService.getTest();
  readonly mode$ = this.breakpointService.mode$.pipe(map((value) => JSON.stringify(value, null, '  ')));
  readonly active$ = this.breakpointService.mode$.pipe(
    map((value) =>
      Object.entries(value)
        .filter((v) => v[1])
        .map((v) => v[0])
    )
  );

  constructor(
    private readonly testHttpService: TestHttpService,
    private readonly breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {}
}
