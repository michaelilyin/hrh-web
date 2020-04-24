import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SkeletonBehaviour, HasSkeletonProperties, mixinSkeleton } from '@hrh/sdk/skeleton/skeleton-commons';

class TextSkeletonComponentBase implements HasSkeletonProperties {
  skeletonStyle = {
    height: '0.9em',
    margin: '2px'
  };
  type = 'line';
  skeletons = [{}];
  lines = 5;
}

const _LineSkeletonBase = mixinSkeleton(TextSkeletonComponentBase);

@Component({
  selector: 'hrh-text-skeleton',
  templateUrl: '../skeleton.component.html',
  styleUrls: ['../skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disableAnimation', 'showContent', 'lines'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.margin-bottom.px]': '-8'
  }
})
export class TextSkeletonComponent extends _LineSkeletonBase implements SkeletonBehaviour, OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
