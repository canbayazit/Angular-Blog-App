import { Component, OnInit } from '@angular/core';
import { combineLatest, from, map, mergeMap, of, skip, take, toArray } from 'rxjs';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AdminEditUserDialogComponent } from '../../components/admin-edit-user-dialog/admin-edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
interface IUser{
  creation_date:string
  email:string
  is_active:boolean
  user_id:number
  username:string
  totalPost?:number;
  totalComment?:number;
}
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

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private dialog: MatDialog
    ) {}
  ngOnInit() {
    this.loadUsers();

  }

  openEditModal(user:IUser): void {
    const dialogRef = this.dialog.open(AdminEditUserDialogComponent, {
      width:'60%',

      data: user,  // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
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
      const getUserDetailsObservables = result.map((user) => {
        const { creation_date, email, is_active, user_id, username } = user;
        const post$ = this.postService.getPostById(user_id, 'user') ?? of([]);;
        const comment$ = this.commentService.getCommentById(user_id, 'user') ?? of([]);;

        return combineLatest([post$, comment$]).pipe(
          map(([posts, comments]) => {
            const totalPost = posts.length;
            const totalComment = comments.length;

            return {
              creation_date,
              email,
              is_active,
              user_id,
              username,
              totalPost,
              totalComment,
            } as IUser;
          })
        );
      });

      combineLatest(getUserDetailsObservables).subscribe((usersWithDetails) => {
        this.userList = usersWithDetails;
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
