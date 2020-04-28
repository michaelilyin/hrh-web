import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import {
  ChangeDetectorRef,
  DoCheck,
  forwardRef,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  Provider,
  Type
} from '@angular/core';
import { Subscription } from 'rxjs';
import { skip, startWith } from 'rxjs/operators';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';

export function formFieldProvider<T>(component: Type<T>): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => component),
    multi: true
  };
}

export interface FormFieldMixinBase {
  // view
  control: NgModel;

  // dependencies
  readonly injector: Injector;
}

export interface FormFieldMixin<V> extends ControlValueAccessor, OnInit, DoCheck, OnDestroy {
  // inputs
  label: string;
  required: boolean;
  readonly: boolean;

  readonly _floatLabelType: FloatLabelType;
  readonly _appearance: MatFormFieldAppearance;
  readonly _disabled: boolean;
  readonly _placeholder: string;

  readonly _value: V | undefined;
  readonly _valueChange: (val: V | undefined) => void;
}

export type FormFieldCtor<V> = Constructor<FormFieldMixin<V>>;

export function mixinFormField<T extends Constructor<FormFieldMixinBase>, V>(base: T): FormFieldCtor<V> & T {
  return class extends base {
    label = '';
    required = false;
    readonly = false;

    private externalControlContainer!: NgControl;
    private externalControl?: AbstractControl;

    private valueChangesSub = Subscription.EMPTY;
    private externalStatusChangesSub = Subscription.EMPTY;
    private _touched = false;
    private cd!: ChangeDetectorRef;
    private _onChange?: (val: V | undefined) => void;
    private _controlDisabled = false;

    _value: V | undefined;
    _valueChange = (val: V | undefined) => {
      this._onChange?.(val);
    };

    // tslint:disable-next-line:no-any
    constructor(...args: any[]) {
      super(...args);
    }

    ngOnInit(): void {
      this.cd = this.injector.get(ChangeDetectorRef);
      this.externalControlContainer = this.injector.get(NgControl);

      this.valueChangesSub = this.control.control.valueChanges.subscribe((value) => {
        this._valueChange(value);
      });
    }

    ngDoCheck(): void {
      this.doCheckErrors();
      this.doCheckTouched();
    }

    ngOnDestroy(): void {
      this.valueChangesSub.unsubscribe();

      this.externalStatusChangesSub.unsubscribe();
    }

    get _floatLabelType(): FloatLabelType {
      return this.readonly || this._disabled ? 'always' : 'auto';
    }

    get _appearance(): MatFormFieldAppearance {
      return 'fill';
    }

    get _disabled(): boolean {
      return this.readonly || this._controlDisabled;
    }

    get _placeholder(): string {
      return this._disabled ? '—' : this.label;
    }

    writeValue(value: V | undefined): void {
      // console.info('write value', value);
      // this.control.control.setValue(value);
      this._value = value;
    }

    registerOnChange(fn: (v: V | undefined) => void): void {
      this._onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {}

    setDisabledState(isDisabled: boolean): void {
      this._controlDisabled = isDisabled;
    }

    private doCheckErrors() {
      // If we reassign component in form without recreation control we need to resubscribe to new control.
      // I believe it should be hidden in control container but it is not.
      // So we check if control changed and do resubscribe manually.
      if (this.externalControl === this.externalControlContainer?.control) {
        return;
      }

      this.externalControl = this.externalControlContainer?.control ?? undefined;
      this.externalStatusChangesSub.unsubscribe();
      this.externalStatusChangesSub =
        this.externalControl?.statusChanges.pipe(startWith(this.externalControl.status)).subscribe((status) => {
          if (status === 'INVALID') {
            this.control.control.setErrors(this.externalControl?.errors ?? null);
          }
          if (status === 'VALID') {
            this.control.control.setErrors(null);
          }
        }) ?? Subscription.EMPTY;
    }

    private doCheckTouched() {
      // We need to check touched state of control and translate it into wrapped control for correctly display validation errors
      if (this.externalControl?.touched === this._touched) {
        return;
      }

      this._touched = this.externalControl?.touched ?? false;
      if (this._touched) {
        this.control.control.markAllAsTouched();
      } else {
        this.control.control.markAsPristine();
      }
    }
  };
}
