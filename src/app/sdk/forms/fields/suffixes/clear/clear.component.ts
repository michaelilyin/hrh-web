import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FORM_FIELD, FormFieldMixin } from '@hrh/sdk/forms/fields/form-field.mixin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrh-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClearComponent implements OnInit, OnDestroy {
  private changeSub = Subscription.EMPTY;

  constructor(@Inject(FORM_FIELD) private field: FormFieldMixin<unknown>, private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeSub = this.field.valueChange.subscribe(() => this.cd.markForCheck());
  }

  ngOnDestroy(): void {
    this.changeSub.unsubscribe();
  }

  handleClearClick() {
    this.field.clear();
  }

  get hasValue(): boolean {
    if (typeof this.field._value === 'string') {
      return this.field._value.trim().length > 0;
    }
    return this.field._value != undefined;
  }
}
