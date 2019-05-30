import { Component, OnInit, Input } from '@angular/core';
import { ReportName } from '../DTO/ReportName';
import { DLLdata } from '../DTO/DLLdata';
import { PopulateDDLDataService } from '../services/PopulateDDLData.service';
import { GetConfigurationService } from '../services/GetConfiguration.service';
import { Configuration } from '../DTO/Configuration'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
	@Input() report:ReportName;
  listData:DLLdata;
  config: Configuration;
  storeProc: string;
  dlldata: DLLdata[];
  selectedValue: string;
  constructor(private _populateddldataservice: PopulateDDLDataService, private _getconfigurationservice: GetConfigurationService) {}
  ngOnInit() {
    
	
  }
  onSelect(event:any): void {
    this.selectedValue = event.target.value;
  }
  ngOnChanges(){
    this._getconfigurationservice.getData(this.report.ReportName)
    .subscribe
    (
      data=>
      {
        this.config=data;
        this.storeProc=this.config.Parameters[0].StoredProcedureName;
        if(this.config.Parameters[0].PrePopulate==true){
        this._populateddldataservice.getData(this.storeProc)
        .subscribe
        (
          data=>
          {
            this.dlldata=data;
          }
        )
      }
      }
    )
  }
}