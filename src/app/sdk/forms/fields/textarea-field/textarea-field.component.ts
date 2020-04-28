import { ChangeDetectionStrategy, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormFieldMixin, formFieldProvider, mixinFormField } from '@hrh/sdk/forms/fields/form-field.mixin';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { mixinTextFormField } from '@hrh/sdk/forms/fields/form-text-field.mixin';

class TextAreaMixinBase {
  control!: NgModel;

  readonly injector!: Injector;
}

const _FormFieldMixin = mixinFormField<Constructor<TextAreaMixinBase>, string>(TextAreaMixinBase);
const _TextFormFieldMixin = mixinTextFormField(_FormFieldMixin);

const _TextAreaBase = _TextFormFieldMixin;

@Component({
  selector: 'hrh-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss', '../form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['label', 'required', 'readonly', 'maxLength'],
  queries: {
    control: new ViewChild('input', { static: true, read: NgModel })
  },
  providers: [formFieldProvider(TextareaFieldComponent)]
})
export class TextareaFieldComponent extends _TextAreaBase implements FormFieldMixin<string>, OnInit {
  @Input() rowsMin = 2;
  @Input() rowsMax = 10;

  constructor(readonly injector: Injector) {
    super();
  }
}
