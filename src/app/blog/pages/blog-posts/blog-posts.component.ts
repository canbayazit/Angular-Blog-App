import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filteredItems: IPost[] = [];
  hasQueryParams:boolean = false;
  constructor(
    private categoriesService: CategoryService,
    private postsService: PostService,
    private route: ActivatedRoute
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

    this.route.queryParamMap.subscribe((params) => {
      const filterSortParam = params.get('filter');
      const filterCategoryIdParam = params.get('categoryId');
      this.applySortFilter(filterSortParam || (filterCategoryIdParam ?? null));
    });
  }

  applySortFilter(filterParam: string | null): IPost[] {
    if (!filterParam) {
      this.hasQueryParams=false;
      return this.postList;
    }

    if (filterParam === 'A_Z') {
      this.hasQueryParams=true;
      this.filteredItems= this.postList.slice().sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filterParam === 'popular') {
      this.hasQueryParams=true;
      this.filteredItems= this.postList.slice().sort((a, b) => b.view_count - a.view_count);
    }

    if (this.postList.find(data=>(data.category_id===parseInt(filterParam)))) {
      this.hasQueryParams=true;
      this.filteredItems= this.postList.filter(data=>data.category_id===parseInt(filterParam))
    }

    return this.postList;
  }
}
