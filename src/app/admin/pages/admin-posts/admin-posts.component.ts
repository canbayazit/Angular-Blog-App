import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent {
  isDetailsVisible:boolean = true;

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }
}
