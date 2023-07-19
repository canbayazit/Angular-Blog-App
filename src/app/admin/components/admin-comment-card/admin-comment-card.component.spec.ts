import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentCardComponent } from './admin-comment-card.component';

describe('AdminCommentCardComponent', () => {
  let component: AdminCommentCardComponent;
  let fixture: ComponentFixture<AdminCommentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCommentCardComponent]
    });
    fixture = TestBed.createComponent(AdminCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
