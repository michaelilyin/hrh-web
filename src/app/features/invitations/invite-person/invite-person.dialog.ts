import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitationValidation } from '../_validation/invitation.validation';
import { Loader } from '@hrh/sdk/layout/loader/loader.component';
import { InvitationsService } from '../_services/invitations.service';
import { InvitationCreateInput } from '../_models/invitation.model';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';
import { TextValidators } from '@hrh/sdk/forms/validation/text.validators';
import { InvitePersonDialogInput } from './invite-person-dialog-input.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface InviteForm {
  email: string;
  invitation: string;
}

@Component({
  templateUrl: './invite-person.dialog.html',
  styleUrls: ['./invite-person.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitePersonDialog implements OnInit {
  readonly form: FormGroup;
  readonly InvitationValidation = InvitationValidation;

  @ViewChild('loader', { read: Loader, static: false }) loader!: Loader;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: InvitePersonDialogInput,
    private readonly fb: FormBuilder,
    private readonly invitationsService: InvitationsService,
    private readonly notificationsService: NotificationsService,
    private readonly dialogRef: MatDialogRef<InvitePersonDialog, void>
  ) {
    this.form = fb.group({
      email: fb.control('', [
        Validators.required,
        Validators.maxLength(InvitationValidation.MAX_EMAIL_LENGTH),
        TextValidators.pattern(/\S+@\S+\.\S+/, 'should be valid email')
      ]),
      invitation: fb.control('', [
        Validators.required,
        Validators.maxLength(InvitationValidation.MAX_INVITATION_LENGTH)
      ])
    });
  }

  ngOnInit(): void {}

  handleFormSubmit(form: InviteForm) {
    const input: InvitationCreateInput = {
      houseId: this.data.house.id,
      userEmail: form.email.trim(),
      invitation: form.invitation.trim()
    };
    const create$ = this.invitationsService.createInvitation(input);

    this.loader.operationOn(create$).subscribe(() => {
      this.notificationsService.success('Invitation created');
      this.dialogRef.close();
    }, this.notificationsService.handleError);
  }
}
