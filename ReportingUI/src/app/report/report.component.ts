import { Component, OnInit, Input} from '@angular/core';
import { ReportName} from '../DTO/ReportName'
import { GetReport } from '../services/GetReport.service';
import { Configuration } from '../DTO/Configuration';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() report:ReportName;
  @Input() selectedValue: string;
  @Input() config:Configuration;
  constructor(private _getReport: GetReport) { }
  comms:any;
  keyss:any;
  
  arrayOne(n: number): any[] {
    return Array(n);
  }

  ngOnInit(){

  }

  ngOnChanges() {
    this._getReport.getData(this.config.StoredProcedureName,this.config.Parameters[0].Name, this.selectedValue)
    .subscribe
    (
      data=>
      {
        this.comms=data;
        if(this.comms.length != 0) this.keyss = Object.keys(this.comms[0]);
      }
    );

  }
}
