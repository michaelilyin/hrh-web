import { Constructor } from '@angular/material/core/common-behaviors/constructor';

export interface HasSkeletonProperties {
  type: string;
  skeletonStyle: {
    animation?: string;
    'background-image'?: string;
    margin?: string;
  };
  skeletons: {
    width?: string;
  }[];
  lines: number;
}

export interface SkeletonBehaviour {
  disableAnimation?: boolean;
  showContent: boolean;
}

export type CanDisableSkeletonAnimationCtor = Constructor<SkeletonBehaviour>;

export function mixinSkeleton<T extends Constructor<HasSkeletonProperties>>(
  base: T
): CanDisableSkeletonAnimationCtor & T {
  return class extends base {
    private _disableAnimation?: boolean;
    public showContent: boolean;

    get disableAnimation(): boolean | undefined {
      return this._disableAnimation;
    }
    set disableAnimation(value: boolean | undefined) {
      const disableAnimation = value || false;

      if (disableAnimation !== this._disableAnimation) {
        if (this._disableAnimation) {
          this.skeletonStyle = {
            ...this.skeletonStyle,
            'background-image': undefined,
            animation: undefined
          };
        }
        if (disableAnimation) {
          this.skeletonStyle = {
            ...this.skeletonStyle,
            'background-image': 'none',
            animation: 'none'
          };
        }

        this._disableAnimation = disableAnimation;
      }
    }

    // tslint:disable-next-line:no-any
    constructor(...args: any[]) {
      super(...args);

      this.disableAnimation = false;
      this.showContent = false;
    }
  };
}
