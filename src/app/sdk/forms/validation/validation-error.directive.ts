import { Directive, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { transformValidationError, TypedValidationErrors } from '@hrh/sdk/forms/validation/validation.pipe';
import { Changes } from '@hrh/sdk/angular/changes/changes.model';

interface ErrorTemplateContext {
  $implicit: string;
}

export type ValidationErrorsOfInput = TypedValidationErrors | ValidationErrors;

@Directive({
  selector: '[hrhValidationError]'
})
export class ValidationErrorsDirective implements OnChanges, OnDestroy {
  @Input() hrhValidationErrorOf!: ValidationErrorsOfInput;
  @Input() hrhValidationErrorBy = 'field';

  private statusSub = Subscription.EMPTY;

  constructor(private vcr: ViewContainerRef, private template: TemplateRef<ErrorTemplateContext>) {}

  ngOnChanges(changes: Changes<this>): void {
    if (changes.hrhValidationErrorOf != undefined) {
      this.processErrorsChange(changes.hrhValidationErrorOf.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }

  private processErrorsChange(input: ValidationErrorsOfInput | undefined) {
    this.statusSub.unsubscribe();

    const errors = input as TypedValidationErrors | undefined;
    this.redrawErrors(errors, this.hrhValidationErrorBy);
  }

  private redrawErrors(errors: TypedValidationErrors | undefined, controlLabel: string) {
    this.vcr.clear();

    if (errors == undefined) {
      return;
    }

    // TODO: maybe optimize (a La track by)
    for (const key in errors) {
      if (!errors.hasOwnProperty(key)) {
        continue;
      }
      const error = key as keyof TypedValidationErrors;
      this.vcr.createEmbeddedView(this.template, {
        $implicit: transformValidationError(controlLabel, error, errors[error])
      });

      // Render only first error for save layout
      return;
    }
  }
}
