import { Component, OnInit } from '@angular/core';
import ICategory from 'src/app/model/category/category';
import IPost from 'src/app/model/post/post';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
})
export class BlogPostsComponent implements OnInit {
  categoryList: ICategory[] = [];
  postList: IPost[] = [];
  constructor(
    private categoriesService: CategoryService,
    private postsService: PostService
  ) {}
  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categoryList = categories.map((category) => {
        const { category_id, creation_date, name } = category;
        return { category_id, creation_date, name } as ICategory;
      });
      console.log(this.categoryList);
    });

    this.postsService.getPosts().subscribe((posts) => {
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
      console.log(posts);
    });
  }
  applyFilter(filter: string) {}
}
