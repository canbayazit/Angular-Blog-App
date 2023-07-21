import { Component, Input } from '@angular/core';
import IPost from 'src/app/model/post/post';

@Component({
  selector: 'app-admin-post-detail',
  templateUrl: './admin-post-detail.component.html',
  styleUrls: ['./admin-post-detail.component.scss'],
})
export class AdminPostDetailComponent {
  @Input() post?: IPost;
}
