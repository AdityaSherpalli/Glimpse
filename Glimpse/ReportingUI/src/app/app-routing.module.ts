import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { FiltersComponent } from './filters/filters.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

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
    path:'barchart',
    component:BarChartComponent
  },
  {
    path:'linechart',
    component:LineChartComponent
  },
  {
    path:'piechart',
    component:PieChartComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'dashboard',
    component:DashBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }