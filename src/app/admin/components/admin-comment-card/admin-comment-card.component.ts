import { Component, Inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IComment from 'src/app/model/comment/comment';
import { AdminEditCommentDialogComponent } from '../admin-edit-comment-dialog/admin-edit-comment-dialog.component';
import { CommentService } from 'src/app/services/comment-service/comment.service';

@Component({
  selector: 'app-admin-comment-card',
  templateUrl: './admin-comment-card.component.html',
  styleUrls: ['./admin-comment-card.component.scss'],
})
export class AdminCommentCardComponent {
  @Input() comment?: IComment;
  constructor(
    private dialog: MatDialog,
    private commentService: CommentService
    ) {}
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

  deleteComment(){
    if (this.comment?.comment_id) {
      this.commentService.deleteComment(this.comment?.comment_id)
    }
  }
}


