import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCommentDialogComponent } from './admin-edit-comment-dialog.component';

describe('AdminEditCommentDialogComponent', () => {
  let component: AdminEditCommentDialogComponent;
  let fixture: ComponentFixture<AdminEditCommentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditCommentDialogComponent]
    });
    fixture = TestBed.createComponent(AdminEditCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
