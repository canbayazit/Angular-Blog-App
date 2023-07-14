import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';
import { BlogSidebarComponent } from './components/blog-sidebar/blog-sidebar.component';
import { BlogFooterComponent } from './components/blog-footer/blog-footer.component';
import { BlogLayoutComponent } from '../layout/blog-layout/blog-layout.component';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { PostService } from '../services/post.service';


@NgModule({
  declarations: [
    BlogLayoutComponent,
    BlogHomeComponent,
    BlogHeaderComponent,
    BlogSidebarComponent,
    BlogFooterComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers:[]
})
export class BlogModule { }
