import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  HouseDeleteConfirmDialogInput,
  HouseDeleteConfirmDialogResult
} from '@hrh/houses/house-delete-confirm-dialog/house-delete-confirm-dialog-input.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypedValidationErrors } from '@hrh/sdk/forms/validation/validation.pipe';

@Component({
  selector: 'hrh-house-delete-confirm-dialog',
  templateUrl: './house-delete-confirm-dialog.component.html',
  styleUrls: ['./house-delete-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseDeleteConfirmDialogComponent implements OnInit {
  readonly form: FormGroup;

  private nameMatchValidator = (control: AbstractControl) => {
    const value = control.value as string | undefined;
    if (value?.trim() !== this.data.name.trim()) {
      return {
        match: this.data.name
      } as TypedValidationErrors;
    }
    return null;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: HouseDeleteConfirmDialogInput,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<HouseDeleteConfirmDialogComponent, HouseDeleteConfirmDialogResult>
  ) {
    this.form = fb.group({
      name: fb.control('', [Validators.required, this.nameMatchValidator])
    });
  }

  ngOnInit(): void {}

  handleConfirmSubmit(value: { name: string }) {
    this.dialogRef.close({
      id: this.data.id,
      confirmed: true
    });
  }
}
