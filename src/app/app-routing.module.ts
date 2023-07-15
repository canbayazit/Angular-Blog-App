import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog/pages/blog-home/blog-home.component';
import { BlogLayoutComponent } from './layout/blog-layout/blog-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { BlogFooterComponent } from './blog/components/blog-footer/blog-footer.component';
import { BlogPostsComponent } from './blog/pages/blog-posts/blog-posts.component';
import { BlogPostDetailComponent } from './blog/pages/blog-post-detail/blog-post-detail.component';
import { BlogCategoriesComponent } from './blog/pages/blog-categories/blog-categories.component';
import { BlogUsersComponent } from './blog/pages/blog-users/blog-users.component';

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
        path: '',
        component: AdminHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
