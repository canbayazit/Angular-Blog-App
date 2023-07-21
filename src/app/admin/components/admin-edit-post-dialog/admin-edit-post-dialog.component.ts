import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IPost from 'src/app/model/post/post';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-admin-edit-post-dialog',
  templateUrl: './admin-edit-post-dialog.component.html',
  styleUrls: ['./admin-edit-post-dialog.component.scss']
})
export class AdminEditPostDialogComponent {
  editPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminEditPostDialogComponent>,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: IPost
  ) {
    this.editPostForm = this.fb.group({
      title: [data.title, Validators.required],
      content: [data.content, Validators.required],
      creation_date: [data.creation_date, Validators.required],
      is_published: [data.is_published, Validators.required],
      post_id: [data.post_id, Validators.required],
      user_id: [data.user_id, Validators.required],
      category_id: [data.category_id, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editPostForm.valid) {
      const updatedComment = this.editPostForm.value;
      console.log(updatedComment,"updatedComment")
      this.postService.updatePost(updatedComment).then(() => {
        // Optionally, you can handle success/failure here
        this.dialogRef.close(updatedComment);
      });
    }
  }
}
