import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';
import { BlogSidebarComponent } from './components/blog-sidebar/blog-sidebar.component';
import { BlogFooterComponent } from './components/blog-footer/blog-footer.component';
import { BlogLayoutComponent } from '../layout/blog-layout/blog-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { BlogPostsComponent } from './pages/blog-posts/blog-posts.component';
import { BlogUsersComponent } from './pages/blog-users/blog-users.component';
import { BlogCategoriesComponent } from './pages/blog-categories/blog-categories.component';
import { BlogPostDetailComponent } from './pages/blog-post-detail/blog-post-detail.component';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { RouterModule } from '@angular/router';
import { BlogCardComponent } from './components/blog-card/blog-card.component';


@NgModule({
  declarations: [
    BlogLayoutComponent,
    BlogHomeComponent,
    BlogHeaderComponent,
    BlogSidebarComponent,
    BlogFooterComponent,
    BlogPostsComponent,
    BlogUsersComponent,
    BlogCategoriesComponent,
    BlogPostDetailComponent,
    BlogCardComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialUiModule,
    RouterModule
  ],
  providers:[]
})
export class BlogModule { }
