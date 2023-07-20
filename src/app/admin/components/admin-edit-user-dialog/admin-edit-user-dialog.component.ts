import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IUser from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-admin-edit-user-dialog',
  templateUrl: './admin-edit-user-dialog.component.html',
  styleUrls: ['./admin-edit-user-dialog.component.scss']
})
export class AdminEditUserDialogComponent {
  editCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminEditUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    this.editCommentForm = this.fb.group({
      username: [data.username, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      creation_date: [data.creation_date, Validators.required],
      is_active: [data.is_active, Validators.required],
      user_id: [data.user_id, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editCommentForm.valid) {
      const updatedComment = this.editCommentForm.value;
      console.log(updatedComment,"updatedComment")
      this.userService.updateUser(updatedComment).then(() => {
        // Optionally, you can handle success/failure here
        this.dialogRef.close(updatedComment);
      });
    }
  }
}
