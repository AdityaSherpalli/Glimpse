import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'report',
    component:ReportComponent
  },
  {
    path:'filters',
    component:FiltersComponent
  },
  {
    path:'dashboard',
    component:DragDropComponent
  },
  {
    path:'header',
    component:HeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }