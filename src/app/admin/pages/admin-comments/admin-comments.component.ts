import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IComment from 'src/app/model/comment/comment';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AdminEditCommentDialogComponent } from '../../components/admin-edit-comment-dialog/admin-edit-comment-dialog.component';
import { combineLatest, map, of } from 'rxjs';
import IPost from 'src/app/model/post/post';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit{
  isDetailsVisible:boolean = true;
  currentPage: number = 1;
  pageSize: number = 10;
  selectedIndex: number = -1;
  commentList: IComment[] = [];
  post?:IPost;
  userId?:number;
  
  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private dialog: MatDialog
    ) {}



  ngOnInit() {
    this.loadUsers();
  }
  isSelected(index: number,comment:IComment) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
      this.post=comment.post;
      this.userId=comment.user_id;
    }
  }
  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }

  loadUsers() {
    this.commentService.getCommentByPaginator(this.currentPage, this.pageSize).subscribe((result) => {
      const getCommentDetailsObservables = result.map((commentData) => {
        const { comment, comment_id, creation_date, is_confirmed, post_id,user_id } = commentData;
        // user_id'e ait post'ları ve comment'ları çek yoksa boş observable dön
        const post$ = this.postService.getPostById(post_id, 'post') ?? of([]);
        const user$ = this.userService.getUserById(user_id) ?? of([]);
        // observable nesnelerini birleştir tek bir observable nesnesi haline getirir,
        // observable'ın en son value'su neyse onu alır
        return combineLatest([post$, user$]).pipe(
          map(([posts, users]) => {
            const post = posts[0];
            const username = users[0]['username'];

            return {
              comment, comment_id, creation_date, is_confirmed, post_id,user_id,username,post
            } as IComment;
          })
        );
      });

      combineLatest(getCommentDetailsObservables).subscribe((commentsWithDetails) => {
        this.commentList = commentsWithDetails;
      });
    });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.commentList.length >= this.pageSize) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  openEditModal(comment:IComment): void {
    const dialogRef = this.dialog.open(AdminEditCommentDialogComponent, {
      width:'60%',
      data: comment,  // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
  }
}
