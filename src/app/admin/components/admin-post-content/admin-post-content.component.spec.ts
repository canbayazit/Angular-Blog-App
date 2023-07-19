import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostContentComponent } from './admin-post-content.component';

describe('AdminPostContentComponent', () => {
  let component: AdminPostContentComponent;
  let fixture: ComponentFixture<AdminPostContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPostContentComponent]
    });
    fixture = TestBed.createComponent(AdminPostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
