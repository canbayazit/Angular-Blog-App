import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditPostDialogComponent } from './admin-edit-post-dialog.component';

describe('AdminEditPostDialogComponent', () => {
  let component: AdminEditPostDialogComponent;
  let fixture: ComponentFixture<AdminEditPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditPostDialogComponent]
    });
    fixture = TestBed.createComponent(AdminEditPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
