import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ReportName} from '../DTO/ReportName'
import { GetReport } from '../services/GetReport.service';
import { Configuration } from '../DTO/Configuration';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { SqlParam } from '../DTO/SqlParam';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() report:ReportName;
  @Input() parameters:{};
  @Input()reportPresent:boolean;
  @Input() config:Configuration;
  @Input() selectedValue:boolean;
  @Input() showDefaultFilters:boolean;
  @Input() DefaultFilters:SqlParam[];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  renderData:MatTableDataSource<any>;
  constructor(private _getReport: GetReport) {
    this.parameters = new Map<string, string>();
    
  }
  comms:any;
  keyss:any;
  rows:number;
  displayedColumns=this.keyss;
  name:string=null;
  arrayOne(n: number): any[] {
    return Array(n);
  }
  ngOnInit(){
  }
  
  ngOnChanges() {
    if(this.reportPresent==true)document.getElementById("noreport").style.display="none";
    this.name="Report " + this.report.DisplayName;
    if(this.report.DisplayName!=null)
    {
      this._getReport.getData(this.config.StoredProcedureName, this.parameters)
      .subscribe
      (
        data=>
        {
          this.comms=data;
          if(this.comms.length != 0) this.keyss = Object.keys(this.comms[0]);
          this.rows=this.comms.length;
          this.renderData=new MatTableDataSource(this.comms);
          this.renderData.sort=this.sort;
          this.renderData.paginator=this.paginator;
        }
      );
    }
  }
}