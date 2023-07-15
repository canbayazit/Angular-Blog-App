import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.scss']
})
export class BlogHeaderComponent {
  @Output() toggleDrawer: EventEmitter<void> = new EventEmitter<void>();

  onToggleDrawer(): void {
    this.toggleDrawer.emit();
  }
}
