import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserDialogComponent } from './admin-edit-user-dialog.component';

describe('AdminEditUserDialogComponent', () => {
  let component: AdminEditUserDialogComponent;
  let fixture: ComponentFixture<AdminEditUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUserDialogComponent]
    });
    fixture = TestBed.createComponent(AdminEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
