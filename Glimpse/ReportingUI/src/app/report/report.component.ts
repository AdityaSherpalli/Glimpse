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
  @Input() parameters: Map<string, string>;
  @Input() config:Configuration;
  @Input() selectedValue:string;
  constructor(private _getReport: GetReport) {
    this.parameters = new Map<string, string>();
  }
  comms:any;
  keyss:any;
  rows:number;
  
  arrayOne(n: number): any[] {
    return Array(n);
  }

  ngOnInit(){
    console.log(this.parameters.size +' map');
    console.log(this.parameters.get('@dept'));
  }

  ngOnChanges() {
    console.log(this.parameters.size +' map');
    console.log(this.parameters.get('@dept'));
    this._getReport.getData(this.config.StoredProcedureName, this.parameters)
    .subscribe
    (
      data=>
      {
        this.comms=data;
        if(this.comms.length != 0) this.keyss = Object.keys(this.comms[0]);
        this.rows=this.comms.length;
      }
    );

  }
}
