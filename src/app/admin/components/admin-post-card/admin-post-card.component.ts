import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IComment from 'src/app/model/comment/comment';
import IPost from 'src/app/model/post/post';
import IUser from 'src/app/model/user/user';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AdminEditPostDialogComponent } from '../admin-edit-post-dialog/admin-edit-post-dialog.component';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-admin-post-card',
  templateUrl: './admin-post-card.component.html',
  styleUrls: ['./admin-post-card.component.scss'],
})
export class AdminPostCardComponent implements OnChanges {
  @Input() post?: IPost;
  @Input() commentUserId?: number;
  user?: IUser;
  commentList: IComment[] = [];

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnChanges() {
    if (this.post?.user_id) {
      this.userService.getUserById(this.post?.user_id).subscribe((users) => {
        if (users.length > 0) {
          const data = users[0];
          this.user = {
            creation_date: data['creation_date'],
            email: data['email'],
            is_active: data['is_active'],
            user_id: data['user_id'],
            username: data['username'],
          };
        }
      });

      this.commentService
        .getCommentById(this.post?.post_id, 'post')
        ?.subscribe((comments) => {
          if (comments.length > 0) {
            comments.forEach((commentData) => {
              const {
                comment,
                comment_id,
                creation_date,
                is_confirmed,
                post_id,
                user_id,
              } = commentData as IComment;

              this.userService.getUserById(user_id).subscribe((users) => {
                if (users.length > 0) {
                  const userData = users[0];
                  const commentWithUsername: IComment = {
                    comment,
                    comment_id,
                    creation_date,
                    is_confirmed,
                    post_id,
                    user_id,
                    username: userData['username'],
                  };
                  this.commentList = [...this.commentList, commentWithUsername];
                }
              });
            });
          }
        });
    }
  }

  deleteUser() {
    if (this.post?.post_id) {
      this.postService.deletePost(this.post.post_id);
    }
  }
  openEditModal() {
    const dialogRef = this.dialog.open(AdminEditPostDialogComponent, {
      width: '60%',
      data: this.post, // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
  }
}
