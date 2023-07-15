import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { map, tap } from 'rxjs';
import ICategory from 'src/app/model/category/category';
import { CategoryService } from 'src/app/services/category-service/category.service';
interface INavList {
  name: string;
  path: string;
}

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.scss'],
  styles: [
    `
      ::ng-deep .specific-class > .mat-expansion-indicator:after {
        color: white;
      }
    `,
  ],
})
export class BlogSidebarComponent implements OnInit {
  headerList: INavList[] = [
    { name: 'Dashboard', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: 'Users', path: '/users' },
  ];
  categoryList: ICategory[] = [];
  panelOpenState = false;

  constructor(private categoriesService: CategoryService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categoryList = categories.map((category) => {
        const { category_id, creation_date, name } = category;
        return { category_id, creation_date, name } as ICategory;
      });
      console.log(this.categoryList);
    });
  }

  isHomePage(){
    return location.pathname==="/";
  }
}
