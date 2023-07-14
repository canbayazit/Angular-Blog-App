import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog/components/blog-home/blog-home.component';
import { BlogLayoutComponent } from './layout/blog-layout/blog-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: '',
    component: BlogLayoutComponent,
    children: [
      {
        path: '',
        component: BlogHomeComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
