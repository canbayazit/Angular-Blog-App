import { Component, OnInit } from '@angular/core';
import { from, map, mergeMap, skip, take, toArray } from 'rxjs';
import IUser from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  isDetailsVisible: boolean = true;
  userList: IUser[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  selectedIndex: number = -1;
  userId?:number;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.loadUsers();
  }
  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }
  isSelected(index: number,user_id:number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
      this.userId=user_id;
    }
  }
  loadUsers() {
    this.userService.getUserByPaginator(this.currentPage, this.pageSize).subscribe((result) => {
      this.userList = result.map((user) => {
        const { creation_date, email, is_active, user_id, username } = user;
        return {
          creation_date,
          email,
          is_active,
          user_id,
          username,
        } as IUser;
      });
    });
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    console.log(this.pageSize,"this.pageSize")
    console.log(this.currentPage,"this.currentPage")
    console.log(this.userList.length,"this.length")
    if (this.userList.length >= this.pageSize) {
      this.currentPage++;
      this.loadUsers();
    }
  }

}
