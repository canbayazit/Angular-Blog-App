import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-admin-add-category-dialog',
  templateUrl: './admin-add-category-dialog.component.html',
  styleUrls: ['./admin-add-category-dialog.component.scss']
})
export class AdminAddCategoryDialogComponent {
  addCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminAddCategoryDialogComponent>,
    private categoryService: CategoryService,
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      creation_date: [null, Validators.required],
      category_id: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.addCategoryForm.valid) {
      const addCategory = this.addCategoryForm.value;
      console.log(addCategory, "newCategory");
      this.categoryService.addCategory(addCategory)
      this.dialogRef.close();
    }
  }
}
