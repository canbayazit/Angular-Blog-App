import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogCardComponent } from './admin-blog-card.component';

describe('AdminBlogCardComponent', () => {
  let component: AdminBlogCardComponent;
  let fixture: ComponentFixture<AdminBlogCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBlogCardComponent]
    });
    fixture = TestBed.createComponent(AdminBlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
