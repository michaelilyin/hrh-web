import { ChangeDetectionStrategy, Component, Injector, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormFieldMixin, formFieldProvider, mixinFormField } from '@hrh/sdk/forms/fields/form-field.mixin';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { mixinTextFormField } from '@hrh/sdk/forms/fields/form-text-field.mixin';

class TextFieldMixinBase {
  control!: NgModel;

  readonly injector!: Injector;
}

const _FormFieldMixin = mixinFormField<Constructor<TextFieldMixinBase>, string>(TextFieldMixinBase);
const _TextFormFieldMixin = mixinTextFormField(_FormFieldMixin);

const _TextFieldBase = _TextFormFieldMixin;

@Component({
  selector: 'hrh-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss', '../form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['label', 'required', 'readonly', 'maxLength'],
  queries: {
    control: new ViewChild('input', { static: true, read: NgModel })
  },
  providers: [formFieldProvider(TextFieldComponent)]
})
export class TextFieldComponent extends _TextFieldBase implements FormFieldMixin<string> {
  constructor(readonly injector: Injector) {
    super();
  }
}
