import { ValidatorFn, Validators } from '@angular/forms';
import { TypedValidationErrors } from '@hrh/sdk/forms/validation/validation.pipe';

export class TextValidators {
  static pattern(regexp: RegExp, message: string): ValidatorFn {
    const validator = Validators.pattern(regexp);
    return (control) => {
      const res = validator(control) as TypedValidationErrors;
      if (res?.pattern != undefined) {
        return {
          ...res,
          pattern: {
            ...res.pattern,
            message
          }
        };
      }
      return null;
    };
  }
}
