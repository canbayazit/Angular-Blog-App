import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog/pages/blog-home/blog-home.component';
import { BlogLayoutComponent } from './layout/blog-layout/blog-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { BlogFooterComponent } from './blog/components/blog-footer/blog-footer.component';
import { BlogPostsComponent } from './blog/pages/blog-posts/blog-posts.component';
import { BlogPostDetailComponent } from './blog/pages/blog-post-detail/blog-post-detail.component';
import { BlogCategoriesComponent } from './blog/pages/blog-categories/blog-categories.component';
import { BlogUsersComponent } from './blog/pages/blog-users/blog-users.component';
import { AdminCategoryComponent } from './admin/pages/admin-category/admin-category.component';
import { AdminUserComponent } from './admin/pages/admin-user/admin-user.component';
import { AdminPostsComponent } from './admin/pages/admin-posts/admin-posts.component';
import { AdminCommentsComponent } from './admin/pages/admin-comments/admin-comments.component';
import { AdminUserDetailComponent } from './admin/components/admin-user-detail/admin-user-detail.component';
import { AdminPostDetailComponent } from './admin/components/admin-post-detail/admin-post-detail.component';
import { AdminCommentDetailComponent } from './admin/components/admin-comment-detail/admin-comment-detail.component';


const routes: Routes = [
  {
    path: "",
    component: BlogLayoutComponent,
    children: [
      {
        path: '',
        component: BlogHomeComponent,
      },
      {
        path: 'posts',
        component: BlogPostsComponent,
      },
      {
        path: 'posts/detail/:id',
        component: BlogPostDetailComponent,
      },
      {
        path: 'categories',
        component: BlogCategoriesComponent,
      },
      {
        path: 'posts/:category',
        component: BlogPostsComponent,
      },
      {
        path: 'users',
        component: BlogUsersComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'user',
        component: AdminUserComponent,
        children: [
          {
            path: 'detail/:id',
            component: AdminUserDetailComponent,

          },
        ]
      },

      {
        path: 'post',
        component: AdminPostsComponent,
        children: [
          {
            path: 'detail/:id',
            component: AdminPostDetailComponent,
          },
        ]
      },
      {
        path: 'category',
        component: AdminCategoryComponent,
      },
      {
        path: 'comment',
        component: AdminCommentsComponent,
        children: [
          {
            path: 'detail',
            component: AdminCommentDetailComponent,
          },
        ]
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
