import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HouseContextService } from '../../_context/house.context';

@Component({
  selector: 'hrh-house-shell',
  templateUrl: './house-shell.component.html',
  styleUrls: ['./house-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseShellComponent implements OnInit {
  readonly house$ = this.houseContextService.context$;

  constructor(private readonly houseContextService: HouseContextService) {}

  ngOnInit(): void {}
}
