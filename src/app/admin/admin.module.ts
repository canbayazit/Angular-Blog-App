import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { RouterModule } from '@angular/router';

import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { AdminUserDetailComponent } from './components/admin-user-detail/admin-user-detail.component';
import { AdminCommentCardComponent } from './components/admin-comment-card/admin-comment-card.component';
import { AdminBlogCardComponent } from './components/admin-blog-card/admin-blog-card.component';
import { AdminPostDetailComponent } from './components/admin-post-detail/admin-post-detail.component';
import { AdminPostContentComponent } from './components/admin-post-content/admin-post-content.component';
import { AdminCommentDetailComponent } from './components/admin-comment-detail/admin-comment-detail.component';
import { AdminUserCardComponent } from './components/admin-user-card/admin-user-card.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminPostsComponent } from './pages/admin-posts/admin-posts.component';
import { AdminCommentsComponent } from './pages/admin-comments/admin-comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminEditCommentDialogComponent } from './components/admin-edit-comment-dialog/admin-edit-comment-dialog.component';
import { TimestampToDatePipe } from '../pipes/timestampToDate/timestamp-to-date.pipe';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminUserComponent,
    AdminPostsComponent,
    AdminCommentsComponent,
    AdminCategoryComponent,
    AdminUserDetailComponent,
    AdminCommentCardComponent,
    AdminBlogCardComponent,
    AdminPostDetailComponent,
    AdminPostContentComponent,
    AdminCommentDetailComponent,
    AdminUserCardComponent,
    AdminEditCommentDialogComponent,
    TimestampToDatePipe

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialUiModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class AdminModule { }
