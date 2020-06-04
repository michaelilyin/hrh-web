import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'hrh-table-side-filter',
  templateUrl: './table-side-filter.component.html',
  styleUrls: ['./table-side-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSideFilterComponent implements OnInit {
  constructor(private readonly cd: ChangeDetectorRef) {}

  opened = false;

  pinned = false;

  ngOnInit(): void {}

  toggle() {
    this.opened = !this.opened;
    this.cd.markForCheck();
  }

  togglePin() {
    this.pinned = !this.pinned;
  }

  get mode(): MatDrawerMode {
    if (this.pinned) {
      return 'side';
    }
    return 'over';
  }

  get hasBackdrop(): boolean {
    return !this.pinned;
  }
}
