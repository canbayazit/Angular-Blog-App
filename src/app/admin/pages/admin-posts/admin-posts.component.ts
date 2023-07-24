import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, of } from 'rxjs';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { AdminEditPostDialogComponent } from '../../components/admin-edit-post-dialog/admin-edit-post-dialog.component';
import { Router } from '@angular/router';
interface IPost{
  category_id: number;
  content: string;
  creation_date: string;
  is_published: boolean;
  post_id: number;
  title: string;
  user_id: number;
  view_count: number;
  totalComment?:number;
}
@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent {
  isDetailsVisible:boolean = true;
  postList: IPost[] = [];
  totalPage:number=1;
  currentPage: number = 1;
  pageSize: number = 10;
  selectedIndex: number = -1;
  post?:IPost;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.postService.getPostByPaginator(this.currentPage, this.pageSize).subscribe((result) => {
      this.totalPage=Math.ceil(result.length / this.pageSize);
      const getPostDetailsObservables = result.data.map((post) => {
        const { category_id, content, creation_date, is_published, post_id,title,user_id,view_count } = post;
        const comment$ = this.commentService.getCommentById(post_id, 'post') ?? of([]);;

        return combineLatest([comment$]).pipe(
          map(([comments]) => {
            const totalComment = comments.length;

            return {
              category_id, content, creation_date, is_published, post_id,title,user_id,view_count,
              totalComment,
            } as IPost;
          })
        );
      });

      combineLatest(getPostDetailsObservables).subscribe((postsWithDetails) => {
        this.postList = postsWithDetails;
      });
    });
  }
  toggleDetails(postId:number) {
    this.isDetailsVisible = !this.isDetailsVisible;
    this.router.navigate(['/admin/post/detail', postId]);
  }
  deleteUser(post: IPost) {
    this.postService.deletePost(post.post_id)
  }
  handleClick(index: number, post: IPost) {
    this.isSelected(index, post);
    this.toggleDetails(post.post_id);
  }
  isSelected(index: number,post:IPost) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
      this.post=post;
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.postList.length >= this.pageSize) {
      this.currentPage++;
      this.loadUsers();
    }
  }
  openEditModal(post:IPost): void {
    const dialogRef = this.dialog.open(AdminEditPostDialogComponent, {
      width:'60%',
      data: post,  // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
  }
}
