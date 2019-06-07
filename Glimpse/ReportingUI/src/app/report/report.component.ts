import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ReportName} from '../DTO/ReportName'
import { GetReport } from '../services/GetReport.service';
import { Configuration } from '../DTO/Configuration';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { keyframes } from '@angular/animations';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() report:ReportName;
  @Input() parameters:{};
  @Input() config:Configuration;
  @Input() selectedValue:string;
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
  arrayOne(n: number): any[] {
    return Array(n);
  }

  ngOnInit(){
  }
  print()
  {
    var toPrint = document.getElementById('printarea');
    var popupWin = window.open('', '_blank', 'width=350,height=150,location=no,left=200px');
    popupWin.document.open();
    popupWin.document.write('<html><title>::Preview::</title><link rel="stylesheet" type="text/css" href="print.css" /></head><body onload="window.print()">')
    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write('</html>');
    popupWin.document.close();
  }
  ngOnChanges() {
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
