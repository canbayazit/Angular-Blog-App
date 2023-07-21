import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCategoryDialogComponent } from './admin-edit-category-dialog.component';

describe('AdminEditCategoryDialogComponent', () => {
  let component: AdminEditCategoryDialogComponent;
  let fixture: ComponentFixture<AdminEditCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(AdminEditCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
