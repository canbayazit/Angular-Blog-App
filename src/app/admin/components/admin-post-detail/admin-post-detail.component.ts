import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IPost from 'src/app/model/post/post';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-admin-post-detail',
  templateUrl: './admin-post-detail.component.html',
  styleUrls: ['./admin-post-detail.component.scss'],
})
export class AdminPostDetailComponent implements OnInit {
  postList: IPost[] = [];
  constructor(
    // private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute

  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadPosts(parseInt(id));
        // this.loadComments(parseInt(id));
    })
  }

  loadPosts(postId?: number) {
    if (postId) {
      this.postService.getPostById(postId, 'post')?.subscribe((posts) => {
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
}
