import { Component, Input } from '@angular/core';
import IPost from 'src/app/model/post/post';

@Component({
  selector: 'app-admin-comment-detail',
  templateUrl: './admin-comment-detail.component.html',
  styleUrls: ['./admin-comment-detail.component.scss']
})
export class AdminCommentDetailComponent {
  @Input() post?: IPost;
  @Input() userId?: number;
}
