import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent {
  isDetailsVisible:boolean = true;

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }

  
}
