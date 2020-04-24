import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SkeletonBehaviour, HasSkeletonProperties, mixinSkeleton } from '@hrh/sdk/skeleton/skeleton-commons';

class CircleSkeletonComponentBase implements HasSkeletonProperties {
  skeletonStyle = {
    margin: '0'
  };
  type = 'circle';
  skeletons = [{}];
  lines = 1;
}

const _LineSkeletonBase = mixinSkeleton(CircleSkeletonComponentBase);

@Component({
  selector: 'hrh-circle-skeleton',
  templateUrl: '../skeleton.component.html',
  styleUrls: ['../skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disableAnimation', 'showContent']
})
export class CircleSkeletonComponent extends _LineSkeletonBase implements SkeletonBehaviour, OnInit {
  ngOnInit(): void {}
}
