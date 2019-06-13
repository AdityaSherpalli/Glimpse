import { Component, OnInit, Input } from '@angular/core';
import { DLLdata } from '../DTO/DLLdata';
import { PopulateDDLDataService } from '../services/PopulateDDLData.service';
import { GetConfigurationService } from '../services/GetConfiguration.service';
import { GetReportsNameService } from '../services/GetReportsName.service';
import { ReportName } from '../DTO/ReportName'
import { Configuration } from '../DTO/Configuration';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  report: ReportName;
  listData: DLLdata;
  config: Configuration;
  dlldata: {};
  selectedValue: string;
  dateRangeSplitter:string[];
  visible: boolean = true;
  month: string;
  dat: string;
  parameters: {};
  date: string;
  lstRepo: ReportName[];
  reportPresent: boolean;
  constructor(private _populateddldataservice: PopulateDDLDataService,
    private _getconfigurationservice: GetConfigurationService,
    private _getreportsnameservice: GetReportsNameService) {
    this.parameters = new Map<string, string>();
    this.dlldata=new Map<string,DLLdata>();
    this.report = new ReportName();
    if (this.report.DisplayName == null) {
      this.reportPresent = false;
    }
    else {
      this.reportPresent = true;
    }
  }
  ngOnInit() {
    this.visible = true;
    this._getreportsnameservice.getData()
      .subscribe
      (
        data => {
          this.lstRepo = data;
        }
      )
    let today = new Date();
    let x = today.getMonth() + 1;
    let y = today.getDate();
    this.month = x.toString();
    this.dat = y.toString();
    if (x < 10) {
      this.month = '0' + x.toString();
    }
    if (y < 10) {
      this.dat = '0' + y.toString();
    }
    this.date = today.getFullYear() + '-' + this.month + '-' + this.dat;
    console.log(this.date);
  }
  Reset() {
    this.parameters = {};
    for (var i = 0; i < this.config.Parameters.length; i++) {
      this.parameters[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
    }
  }
  GetReportName(Name: string): string {
    return this.lstRepo.find(x => x.ReportName == Name).DisplayName;
  }
  onSelect(event: any): void {
    this.parameters[event.target.id] = event.target.value;
    this.selectedValue = this.parameters[event.target.id];
  }
  onSelectDdlFilter(event: any): void {
    this.parameters[event.target.id] = event.target.value;
    this.selectedValue = this.parameters[event.target.id];
  }
  onSelectDdl(event: any): void {
    this.report.ReportName = event.target.value;
    this.report.DisplayName = this.GetReportName(this.report.ReportName);
    this.parameters = {};
    this.renderData();
    if (this.report.DisplayName == null) {
      this.reportPresent = false;
    }
    else {
      this.reportPresent = true;
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "260px";
    document.getElementById("mySidenav1").style.marginLeft = "260px";
    document.getElementById("main").style.marginLeft = "280px"
    this.visible = true;
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("mySidenav1").style.marginLeft = "20px";
    document.getElementById("main").style.marginLeft = "40px"
    this.visible = false;
  }
  renderData() {
    if (this.report != null) {
      this._getconfigurationservice.getData(this.report.ReportName)
        .subscribe
        (
          data => {
            this.config = data;
            for (var i = 0; i < this.config.Parameters.length; i++) {
              if (this.config.Parameters[i].Type == "string") {
                this.parameters[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
              }
              if (this.config.Parameters[i].Type == "int") {
                this.parameters[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
                if (this.config.Parameters[i].PrePopulate == true) {
                  let filterName=this.config.Parameters[i].Name;
                  this._populateddldataservice.getData(this.config.Parameters[i].StoredProcedureName)
                    .subscribe
                    (
                      
                      data => {
                        this.dlldata[filterName] = data;
                      }
                    )
                }
              }
              if (this.config.Parameters[i].Type == "date") {
                this.parameters[this.config.Parameters[i].Name] = this.date;
              }
              if (this.config.Parameters[i].Type == "dateRange") {
                this.dateRangeSplitter= this.config.Parameters[i].Name.split(",");
                this.parameters[this.dateRangeSplitter[0]] = this.date;
                this.parameters[this.dateRangeSplitter[1]] = this.date;
              }
            }
          }
        )
    }
  }
}