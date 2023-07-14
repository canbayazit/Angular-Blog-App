import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {
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
