import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog-app';
  constructor(
    private matIconRegistery: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistery.addSvgIcon(
      'portal',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/portal.svg')
    );
    this.matIconRegistery.addSvgIcon(
      'entry',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/entry.svg'
      )
    );
  }
}
