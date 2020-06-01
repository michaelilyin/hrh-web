import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as NgFormsModule } from '@angular/forms';
import { TextFieldComponent } from './fields/text-field/text-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextareaFieldComponent } from './fields/textarea-field/textarea-field.component';
import { ValidationPipe } from '@hrh/sdk/forms/validation/validation.pipe';
import { ValidationErrorsDirective } from '@hrh/sdk/forms/validation/validation-error.directive';
import { FieldSuffixDirective } from './fields/suffixes/field-suffix.directive';
import { ClearComponent } from './fields/suffixes/clear/clear.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ValidationPipe,
    ValidationErrorsDirective,
    TextFieldComponent,
    TextareaFieldComponent,
    FieldSuffixDirective,
    ClearComponent
  ],
  exports: [
    ValidationPipe,
    ValidationErrorsDirective,
    TextFieldComponent,
    TextareaFieldComponent,
    FieldSuffixDirective,
    ClearComponent
  ],
  imports: [CommonModule, NgFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class FormsModule {}
