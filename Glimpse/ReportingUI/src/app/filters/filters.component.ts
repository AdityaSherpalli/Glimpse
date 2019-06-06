import { Component, OnInit, Input } from '@angular/core';
import { DLLdata } from '../DTO/DLLdata';
import { PopulateDDLDataService } from '../services/PopulateDDLData.service';
import { GetConfigurationService } from '../services/GetConfiguration.service';
import {GetReportsNameService} from '../services/GetReportsName.service';
import {ReportName} from '../DTO/ReportName'
import { Configuration } from '../DTO/Configuration';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
	report:ReportName;
  listData:DLLdata;
  config: Configuration;
  dlldata: DLLdata[];
  selectedValue:string;
  visible:boolean;
  parameters:{};
  lstRepo:ReportName[];
  constructor(private _populateddldataservice: PopulateDDLDataService, 
    private _getconfigurationservice: GetConfigurationService,
    private _getreportsnameservice:GetReportsNameService) {
      this.parameters = new Map<string, string>();
    }
  ngOnInit() {
    this._getreportsnameservice.getData()
    .subscribe
    (
      data=>
      {
        this.lstRepo=data;
      }
    )
  }
  openNav() {
      document.getElementById("mySidenav").style.width = "220px"
      document.getElementById("MainDdl").style.width = "220px"
      document.getElementById("main").style.marginLeft = "220px";
      this.visible=false;
  }
  Reset()
  {
    this.parameters={};
    for(var i = 0;i < this.config.Parameters.length; i++){
      this.parameters[this.config.Parameters[i].Name]= this.config.Parameters[i].DefaultValue;
    }
  }
  closeNav()
  {
    document.getElementById("mySidenav").style.width = "0px"
    document.getElementById("MainDdl").style.width = "0px"
    document.getElementById("main").style.marginLeft = "40px";
    this.visible=true;
  }
  onSelect(event:any): void {
    this.parameters[event.target.id]= event.target.value;
    this.selectedValue=this.parameters[event.target.id];
  }
  onSelectDdl(report: ReportName): void {
    this.report = report;
    this.parameters={};
    this.renderData();
  }
  renderData(){
    console.log(1);
    if(this.report != null)
    {
      this._getconfigurationservice.getData(this.report.ReportName)
      .subscribe
      (
        data=>
        {
          this.config=data;
          for(var i = 0;i < this.config.Parameters.length; i++){
            if(this.config.Parameters[i].Type=="string"){
              this.parameters[this.config.Parameters[i].Name]= this.config.Parameters[i].DefaultValue;
            }
            if(this.config.Parameters[i].Type=="int"){
              this.parameters[this.config.Parameters[i].Name] = this.config.Parameters[i].DefaultValue;
              if(this.config.Parameters[i].PrePopulate==true){
                this._populateddldataservice.getData(this.config.Parameters[i].StoredProcedureName)
                .subscribe
                (
                  data=>
                  {
                    this.dlldata=data;
                  }
                )
            }
          }
            if(this.config.Parameters[i].Type=="date"){
              this.parameters[this.config.Parameters[i].Name]=this.config.Parameters[i].DefaultValue;
            }
          }
        }
      )
    }
  }
}