import { Component, OnInit, Input } from '@angular/core';
import { DLLdata } from '../DTO/DLLdata';
import { PopulateDDLDataService } from '../services/PopulateDDLData.service';
import { GetConfigurationService } from '../services/GetConfiguration.service';
import { GetReportsNameService } from '../services/GetReportsName.service';
import { ReportName } from '../DTO/ReportName'
import { Configuration } from '../DTO/Configuration';
import { GetDefaultFilters } from '../services/GetDefaultFilters.service';
import { SqlParam } from '../DTO/SqlParam';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  report: ReportName;
  render: string;
  listData: DLLdata;
  config: Configuration;
  dlldata: {};
  selectedValue: boolean;
  dateRangeSplitter: string[];
  visible: boolean = true;
  month: string;
  dat: string;
  parameters: {};
  parameters1:{};
  date: string;
  switch:boolean;
  lstRepo: ReportName[];
  reportPresent: boolean;
  Defaultfilters: SqlParam[];
  showDefaultFilters:boolean;
  DefaultVisible: boolean = false;
  notVisibleParam = {};
  DefaultnotVisibleParam = {};
  constructor(private _populateddldataservice: PopulateDDLDataService,
    private _getconfigurationservice: GetConfigurationService,
    private _getreportsnameservice: GetReportsNameService,
    private _getdefaultfilters: GetDefaultFilters) {
    this.parameters = new Map<string, string>();
    this.parameters1=new Map<string,string>();
    this.notVisibleParam = new Map<string, string>();
    this.DefaultnotVisibleParam = new Map<string, string>();
    this.dlldata = new Map<string, DLLdata>();
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
    this.parameters = {};
    this._getdefaultfilters.getData()
      .subscribe
      (
        data => {
          this.Defaultfilters = data;
          for (var i = 0; i < this.Defaultfilters.length; i++) {
            if (this.Defaultfilters[i].Type == "string") {
              this.parameters[this.Defaultfilters[i].Name] = this.Defaultfilters[i].DefaultValue;
            }
            if (this.Defaultfilters[i].Type == "int") {
              this.parameters[this.Defaultfilters[i].Name] = this.Defaultfilters[i].DefaultValue;
              if (this.Defaultfilters[i].PrePopulate == true) {
                let filterName = this.Defaultfilters[i].Name;
                this._populateddldataservice.getData(this.Defaultfilters[i].StoredProcedureName)
                  .subscribe
                  (

                    data => {
                      this.dlldata[filterName] = data;
                    }
                  )
              }
            }
            if (this.Defaultfilters[i].Type == "date") {
              this.parameters[this.Defaultfilters[i].Name] = this.date;
            }
            if (this.Defaultfilters[i].Type == "dateRange") {
              this.dateRangeSplitter = this.Defaultfilters[i].Name.split(",");
              this.parameters[this.dateRangeSplitter[0]] = this.date;
              this.parameters[this.dateRangeSplitter[1]] = this.date;
            }
          }
          this.DefaultVisible = true;
          this.switch=true;
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
    if(this.switch)
    {
      this.parameters[event.target.id] = event.target.value;
    }
    else
    {
      this.parameters1[event.target.id] = event.target.value;
    }
    this.selectedValue = !this.selectedValue;
  }
  onSelectDdlFilter(event: any): void {
    if(this.switch)
    {
      this.parameters[event.target.id] = event.target.value;
    }
    else
    {
      this.parameters1[event.target.id] = event.target.value;
    }
    this.selectedValue = !this.selectedValue;
  }
  onSelectDdl(event: any): void {
    this.report.ReportName = event.target.value;
    this.report.DisplayName = this.GetReportName(this.report.ReportName);
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
    this.notVisibleParam = {};
    this.DefaultnotVisibleParam = {};
    this.parameters1={};
    if (this.report != null) {
      this._getconfigurationservice.getData(this.report.ReportName)
        .subscribe
        (
          data => {
            this.config = data;
            if (this.config.HasDefaultFilters == true) {
              this.showDefaultFilters=true;
              this.parameters1=this.parameters;
              for (var i = 0; i < this.config.Parameters.length; i++) {
                if (this.config.Parameters[i].Type == "string") {
                  this.parameters1[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
                }
                if (this.config.Parameters[i].Type == "int") {
                  this.parameters1[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
                  if (this.config.Parameters[i].PrePopulate == true) {
                    let filterName = this.config.Parameters[i].Name;
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
                  this.parameters1[this.config.Parameters[i].Name] = this.date;
                }
                if (this.config.Parameters[i].Type == "dateRange") {
                  this.dateRangeSplitter = this.config.Parameters[i].Name.split(",");
                  this.parameters1[this.dateRangeSplitter[0]] = this.date;
                  this.parameters1[this.dateRangeSplitter[1]] = this.date;
                }
              }
            }
            else if (this.config.HasDefaultFilters == false) {
              this.showDefaultFilters=false;
              for (var i = 0; i < this.Defaultfilters.length; i++) {
                this.DefaultnotVisibleParam[this.Defaultfilters[i].Name] = "notVisibleParam";
              }
              for (var i = 0; i < this.config.Parameters.length; i++) {
                if (!this.Defaultfilters.find(x => x.Name == this.config.Parameters[i].Name)) {
                  if (this.config.Parameters[i].Type == "string") {
                    this.parameters1[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
                  }
                  if (this.config.Parameters[i].Type == "int") {
                    this.parameters1[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
                    if (this.config.Parameters[i].PrePopulate == true) {
                      let filterName = this.config.Parameters[i].Name;
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
                    this.parameters1[this.config.Parameters[i].Name] = this.date;
                  }
                  if (this.config.Parameters[i].Type == "dateRange") {
                    this.dateRangeSplitter = this.config.Parameters[i].Name.split(",");
                    this.parameters1[this.dateRangeSplitter[0]] = this.date;
                    this.parameters1[this.dateRangeSplitter[1]] = this.date;
                  }
                }
                else {
                  this.DefaultnotVisibleParam[this.config.Parameters[i].Name] = "VisibleParam";
                  this.parameters1[this.config.Parameters[i].Name]=this.parameters[this.config.Parameters[i].Name];
                  this.notVisibleParam[this.config.Parameters[i].Name] = "notVisibleParam";
                }
              }
            }
          }
        )
        this.render = "yes";
        this.switch=false;
    }
  }
}