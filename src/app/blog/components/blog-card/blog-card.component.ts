import { Component, Input, OnInit } from '@angular/core';
import ICategory from 'src/app/model/category/category';
import IPost from 'src/app/model/post/post';
import IUser from 'src/app/model/user/user';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
 @Input() post?: IPost;
 user?: IUser;
 category?: ICategory;
 commentCount:number=0;
 constructor(
  private categoryService: CategoryService,
  private userService: UserService,
  private commentService: CommentService
) {}
 ngOnInit() {
  if (this.post?.user_id) {
    this.userService.getUserById(this.post?.user_id).subscribe(users=>{
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

    this.commentService.getAllCommentByPostId(this.post?.post_id).subscribe((commentCount)=>{
        this.commentCount=commentCount.length;
    })
  }
  if (this.post?.category_id) {
    this.categoryService.getCategoryById(this.post?.category_id).subscribe(categories=>{
      if (categories.length > 0) {
        const data = categories[0];
        this.category = {
          category_id: data['category_id'],
          creation_date: data['creation_date'],
          name: data['name'],
        };
      }
    })
  }


}


}
