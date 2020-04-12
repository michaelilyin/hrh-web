import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrh-shopping-shell',
  templateUrl: './shopping-shell.component.html',
  styleUrls: ['./shopping-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
