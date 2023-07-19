import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  links = [
    { name: 'USERS', path: 'user' },
    { name: 'POSTS', path: 'post' },
    { name: 'COMMENTS', path: 'comment' },
    { name: 'CATEGORIES', path: 'category' },
  ];
  activeLink:any;
  background: ThemePalette = undefined;
  ngOnInit() {
    this.activeLink = this.links?.find(item=>{
      return "/admin/"+item.path === location.pathname
    })
  }

}
