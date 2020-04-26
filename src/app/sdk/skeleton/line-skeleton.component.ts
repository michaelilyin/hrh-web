import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HasSkeletonProperties, mixinSkeleton, SkeletonBehaviour } from '@hrh/sdk/skeleton/skeleton-commons';

class LineSkeletonComponentBase implements HasSkeletonProperties {
  skeletonStyle = {
    height: '0.9em',
    margin: '2px'
  };
  type = 'line';
  skeletons = [{}];
  lines = 1;
}

const _LineSkeletonBase = mixinSkeleton(LineSkeletonComponentBase);

function randomRange(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start) + start);
}

@Component({
  selector: 'hrh-line-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disableAnimation', 'showContent']
})
export class LineSkeletonComponent extends _LineSkeletonBase implements SkeletonBehaviour, OnInit {
  constructor() {
    super();

    this.words = false;
  }

  ngOnInit(): void {}

  // tslint:disable-next-line:no-unsafe-any
  @Input() set words(value: boolean) {
    if (value) {
      this.skeletons = this.generateSkeletonWords();
    } else {
      this.skeletons = [
        {
          width: 100
        }
      ];
    }
  }

  private generateSkeletonWords() {
    const words = randomRange(2, 5);
    const template = this.skeletons[0];
    const result = [];
    let utilized = 0;

    for (let i = 0; i < words; i++) {
      const origin = this.skeletons[i] ?? template;
      const left = 100 - utilized;

      if (left < 20) {
        continue;
      }

      const length = randomRange(10, left);
      utilized += length;

      result.push({
        ...origin,
        width: length
      });
    }
    return result;
  }
}
