import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import IComment from 'src/app/model/comment/comment';
import { AdminEditCommentDialogComponent } from '../admin-edit-comment-dialog/admin-edit-comment-dialog.component';

@Component({
  selector: 'app-admin-comment-card',
  templateUrl: './admin-comment-card.component.html',
  styleUrls: ['./admin-comment-card.component.scss'],
})
export class AdminCommentCardComponent {
  @Input() comment?: IComment;
  constructor(private dialog: MatDialog) {}
  openEditModal(): void {
    const dialogRef = this.dialog.open(AdminEditCommentDialogComponent, {
      width:'60%',

      data: this.comment,
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        this.comment = updatedComment;
      }
    });
  }
}
