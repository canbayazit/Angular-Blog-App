import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLayoutComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class AdminModule { }
