import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IPost from 'src/app/model/post/post';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-admin-comment-detail',
  templateUrl: './admin-comment-detail.component.html',
  styleUrls: ['./admin-comment-detail.component.scss'],
})
export class AdminCommentDetailComponent implements OnInit {
  commentUserId?: number;
  post?: IPost;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.commentUserId = params['userId'];
      const postId = params['postId'];
      this.loadPosts(parseInt(postId));
    });
  }

  loadPosts(postId?: number) {
    if (postId) {
      this.postService.getPostById(postId, 'post')?.subscribe((posts) => {
        const data = posts[0];
        this.post = {
          category_id: data['category_id'],
          content: data['content'],
          creation_date: data['creation_date'],
          is_published: data['is_published'],
          post_id: data['post_id'],
          title: data['title'],
          user_id: data['user_id'],
          view_count: data['view_count'],
        };
      });
    }
  }
}
