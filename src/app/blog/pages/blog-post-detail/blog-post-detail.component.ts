import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IComment from 'src/app/model/comment/comment';
import IPost from 'src/app/model/post/post';
import IUser from 'src/app/model/user/user';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss'],
})
export class BlogPostDetailComponent implements OnInit {
  post?: IPost;
  user?:IUser;
  commentList:IComment[]=[];
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // id'e göre tek bir post çeken service
      this.postService.getPostById(parseInt(id),"post")?.subscribe((posts) => {
        if (posts.length > 0) {
          const data = posts[0];
          console.log(data['category_id'],"data")
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
          this.userService.getUserById(data['user_id']).subscribe(users=>{
            if (users.length > 0) {
              const data = users[0];
              this.user = {
                creation_date: data['creation_date'],
                email: data['email'],
                is_active: data['is_active'],
                user_id: data['user_id'],
                username: data['username']
              };
            }
          })
        }
      });
      // post id'e göre o posta ait comment'ları çeken service.
      this.commentService.getCommentById(parseInt(id),"post")?.subscribe((comments) => {
        if (comments.length > 0) {
          comments.forEach((commentData) => {
            const {
              comment,
              comment_id,
              creation_date,
              is_confirmed,
              post_id,
              user_id
            } = commentData as IComment;

            this.userService.getUserById(user_id).subscribe(users => {
              if (users.length > 0) {
                const userData = users[0];
                const commentWithUsername: IComment = {
                  comment,
                  comment_id,
                  creation_date,
                  is_confirmed,
                  post_id,
                  user_id,
                  username: userData['username']
                };
                this.commentList=[...this.commentList,commentWithUsername]
              }
            });
          });
        }
      });
      console.log(id);
    });
  }
}
