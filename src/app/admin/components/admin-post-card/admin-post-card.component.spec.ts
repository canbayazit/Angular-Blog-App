import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostCardComponent } from './admin-post-card.component';

describe('AdminPostCardComponent', () => {
  let component: AdminPostCardComponent;
  let fixture: ComponentFixture<AdminPostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostCardComponent]
    });
    fixture = TestBed.createComponent(AdminPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
