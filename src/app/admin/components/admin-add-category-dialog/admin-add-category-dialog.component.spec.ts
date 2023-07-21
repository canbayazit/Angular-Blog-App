import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategoryDialogComponent } from './admin-add-category-dialog.component';

describe('AdminAddCategoryDialogComponent', () => {
  let component: AdminAddCategoryDialogComponent;
  let fixture: ComponentFixture<AdminAddCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(AdminAddCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
