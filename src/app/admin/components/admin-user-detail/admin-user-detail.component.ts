import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import IComment from 'src/app/model/comment/comment';
import IPost from 'src/app/model/post/post';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss'],
})
export class AdminUserDetailComponent implements OnChanges {
  @Input() userId?: number;
  postList: IPost[] = [];
  commentList: IComment[] = [];
  constructor(
    private postService:PostService,
    private commentService:CommentService
  ){

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.loadPosts(this.userId);
      this.loadComments(this.userId);
    }
  }

  loadPosts(userId?: number) {
    if (userId) {
      console.log(userId,"karşılaştır")
      this.postService.getPostById(userId, 'user')?.subscribe((posts) => {
        this.postList = posts.map((post) => {
          const {
            category_id,
            content,
            creation_date,
            is_published,
            post_id,
            title,
            user_id,
            view_count,
          } = post;
          return {
            category_id,
            content,
            creation_date,
            is_published,
            post_id,
            title,
            user_id,
            view_count,
          } as IPost;
        });
      });
    }

  }
  loadComments(userId?:number){
    if (userId) {
      this.commentService.getCommentById(userId, 'user')?.subscribe((comments) => {
        this.commentList = comments.map((commentData) => {
          const {
            comment,
            comment_id,
            creation_date,
            is_confirmed,
            post_id,
            user_id,
            username,
          } = commentData;
          return {
            comment,
            comment_id,
            creation_date,
            is_confirmed,
            post_id,
            user_id,
            username,
          } as IComment;
        });
      });
    }
  }
}
