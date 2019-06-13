import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GetDataService } from './services/GetData.service';
import { GetReportsNameService } from './services/GetReportsName.service';
import {GetGraphDataService} from './services/GetGraphData.service';
import { FiltersComponent } from './filters/filters.component';
import { GetConfigurationService } from './services/GetConfiguration.service';
import { PopulateDDLDataService } from './services/PopulateDDLData.service';
import { GetReport } from './services/GetReport.service';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {DndModule} from 'ng2-dnd';
import {FormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportComponent,
    HeaderComponent,
    FiltersComponent,
    DashBoardComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    DragDropComponent,
    ConfigDialogComponent
  ],
  entryComponents: [ConfigDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ChartsModule,
    DndModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    MatDialogModule
  ],
  providers: [GetDataService,GetGraphDataService, GetReportsNameService, GetConfigurationService, PopulateDDLDataService, GetReport],
  bootstrap: [AppComponent]
})
export class AppModule { }
