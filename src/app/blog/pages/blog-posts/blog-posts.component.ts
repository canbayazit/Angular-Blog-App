import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit{
  constructor(
    private postsService: PostService,
  ){

  }
  ngOnInit(){
    this.postsService.getPosts().subscribe(posts=>{
      console.log(posts)
    })
  }
}
