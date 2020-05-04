import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'hrh-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  private readonly _expanded$ = new BehaviorSubject<boolean>(false);
  readonly expanded$ = this._expanded$.asObservable();

  constructor() {}

  ngOnInit(): void {}

  // tslint:disable-next-line:no-unsafe-any
  @Input() set expanded(value: boolean) {
    this._expanded$.next(value);
  }
}
