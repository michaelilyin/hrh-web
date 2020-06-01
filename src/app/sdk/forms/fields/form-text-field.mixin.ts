import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { FormFieldMixin } from '@hrh/sdk/forms/fields/form-field.mixin';
import { ControlValueAccessor } from '@angular/forms';

export interface FormTextFieldMixinBase extends FormFieldMixin<string> {}

export interface FormTextFieldMixin {
  // inputs
  maxLength?: number;

  readonly showLengthHint: boolean;
  readonly lengthHint: string;
}

export type FormTextFieldCtor = Constructor<FormTextFieldMixin>;

export function mixinTextFormField<T extends Constructor<FormTextFieldMixinBase>>(base: T): FormTextFieldCtor & T {
  return class extends base implements Partial<ControlValueAccessor> {
    maxLength = undefined;

    private currentLength = 0;

    // tslint:disable-next-line:no-any
    constructor(...args: any[]) {
      super(...args);
    }

    get showLengthHint(): boolean {
      if (this.maxLength == undefined) {
        return false;
      }

      if (this.readonly || this._disabled) {
        return false;
      }

      const limit = (this.maxLength ?? Infinity) * 0.5;
      return this.currentLength > limit;
    }

    get lengthHint(): string {
      return `${this.currentLength} / ${this.maxLength ?? Infinity}`;
    }

    registerOnChange(fn: (val: string | undefined) => void): void {
      super.registerOnChange((val: string | undefined) => {
        fn(val);
        this.currentLength = val?.trim()?.length ?? 0;
      });
    }

    writeValue(obj: string | undefined): void {
      if (obj != undefined && typeof obj === 'object') {
        console.error('Illegal object passed to text field', obj);
        throw Error('Illegal object passed to text field');
      }
      super.writeValue(obj);
      this.currentLength = obj?.trim()?.length ?? 0;
    }
  };
}
