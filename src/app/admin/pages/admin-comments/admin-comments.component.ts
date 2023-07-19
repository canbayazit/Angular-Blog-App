import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent {
  isDetailsVisible:boolean = true;

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }
}
