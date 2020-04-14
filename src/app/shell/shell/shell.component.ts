import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestHttpService } from './test-http.service';

@Component({
  selector: 'hrh-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  readonly test$ = this.testHttpService.getTest();

  constructor(private readonly testHttpService: TestHttpService) {}

  ngOnInit(): void {}
}
