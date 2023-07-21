import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ICategory from 'src/app/model/category/category';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-admin-edit-category-dialog',
  templateUrl: './admin-edit-category-dialog.component.html',
  styleUrls: ['./admin-edit-category-dialog.component.scss']
})
export class AdminEditCategoryDialogComponent {
  editCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminEditCategoryDialogComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {
    this.editCategoryForm = this.fb.group({
      name: [data.name, Validators.required],
      creation_date: [data.creation_date, Validators.required],
      category_id: [data.category_id, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editCategoryForm.valid) {
      const updatedCategory = this.editCategoryForm.value;
      console.log(updatedCategory,"updatedCategory")
      this.categoryService.updateCategory(updatedCategory).then(() => {
        // Optionally, you can handle success/failure here
        this.dialogRef.close(updatedCategory);
      });
    }
  }
}
