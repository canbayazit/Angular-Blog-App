import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IComment from 'src/app/model/comment/comment';
import { CommentService } from 'src/app/services/comment-service/comment.service';

@Component({
  selector: 'app-admin-edit-comment-dialog',
  templateUrl: './admin-edit-comment-dialog.component.html',
  styleUrls: ['./admin-edit-comment-dialog.component.scss']
})
export class AdminEditCommentDialogComponent {
  editCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminEditCommentDialogComponent>,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: IComment
  ) {
    this.editCommentForm = this.fb.group({
      comment: [data.comment, Validators.required],
      comment_id: [data.comment_id, Validators.required],
      creation_date: [data.creation_date, Validators.required],
      is_confirmed: [data.is_confirmed, Validators.required],
      post_id: [data.post_id, Validators.required],
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
      this.commentService.updateComment(updatedComment).then(() => {
        // Optionally, you can handle success/failure here
        this.dialogRef.close(updatedComment);
      });
    }
  }
}
