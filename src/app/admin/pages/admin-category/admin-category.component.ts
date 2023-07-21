import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAddCategoryDialogComponent } from '../../components/admin-add-category-dialog/admin-add-category-dialog.component';
import { CategoryService } from 'src/app/services/category-service/category.service';
import ICategory from 'src/app/model/category/category';
import { AdminEditCategoryDialogComponent } from '../../components/admin-edit-category-dialog/admin-edit-category-dialog.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  isDetailsVisible:boolean = true;
  categoryList: ICategory[] = [];
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    ) {}
    ngOnInit() {
      this.loadUsers();
    }
    loadUsers() {
      this.categoryService.getCategories().subscribe((categories) => {
        this.categoryList = categories.map((category) => {
          const { category_id, creation_date, name } = category;
          return { category_id, creation_date, name } as ICategory;
        });
      })
  }

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }
  openEditModal(category:ICategory): void {
    const dialogRef = this.dialog.open(AdminEditCategoryDialogComponent, {
      width:'60%',
      data: category,  // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
  }
  openAddModal(): void {
    const dialogRef = this.dialog.open(AdminAddCategoryDialogComponent, {
      width:'60%',
        // send data to dialog component
    });

    dialogRef.afterClosed().subscribe((updatedComment) => {
      // Update the comment data if needed
      if (updatedComment) {
        // this.comment = updatedComment;
      }
    });
  }
}
