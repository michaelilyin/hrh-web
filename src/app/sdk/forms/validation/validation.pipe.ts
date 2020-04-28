import { isDevMode, Pipe, PipeTransform } from '@angular/core';

export interface LengthError {
  requiredLength: number;
  actualLength: number;
}

export interface MaxError {
  max: number;
  actual: number;
}

export interface MinError {
  min: number;
  actual: number;
}

export interface TypedValidationErrors {
  maxlength?: LengthError;
  minlength?: LengthError;
  required?: true;
  max?: MaxError;
  min?: MinError;
}

export function transformValidationError<K extends keyof TypedValidationErrors>(
  field: string,
  key: K,
  error: TypedValidationErrors[K]
): string {
  switch (key) {
    case 'maxlength':
      const maxlength = error as LengthError;
      return `Max length for ${field} is ${maxlength.requiredLength}, but actual is ${maxlength.actualLength}`;
    case 'minlength':
      const payload = error as LengthError;
      return `Min length for ${field} is ${payload.requiredLength}, but actual is ${payload.actualLength}`;
    case 'required':
      return `${field} is required`;
    case 'max':
      const maxError = error as MaxError;
      return `${field} exceeds a maximum of ${maxError.max}`;
    case 'min':
      const minError = error as MinError;
      return `${field} exceeds a minimum of ${minError.min}`;
    default:
      if (isDevMode()) {
        console.warn('unimplemented validator', field, key, error);
      }
      return isDevMode() ? `${field} is invalid (${key})` : `${field} is invalid`;
  }
}

export type ValidationErrorPair = [keyof TypedValidationErrors, TypedValidationErrors[keyof TypedValidationErrors]];

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {
  transform(value: ValidationErrorPair | undefined, field: string): string | undefined {
    if (value == undefined) {
      return undefined;
    }
    return transformValidationError(field, value[0], value[1]);
  }
}
