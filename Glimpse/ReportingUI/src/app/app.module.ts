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
import { FiltersComponent } from './filters/filters.component';
import { GetConfigurationService } from './services/GetConfiguration.service';
import { PopulateDDLDataService } from './services/PopulateDDLData.service';
import { GetReport } from './services/GetReport.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportComponent,
    HeaderComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GetDataService, GetReportsNameService, GetConfigurationService, PopulateDDLDataService, GetReport],
  bootstrap: [AppComponent]
})
export class AppModule { }
