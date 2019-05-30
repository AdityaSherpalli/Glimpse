import { Component, OnInit } from '@angular/core';
import {GetReportsNameService} from '../services/GetReportsName.service';
import {ReportName} from '../DTO/ReportName'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _getreportsnameservice:GetReportsNameService) { }
  lstRepo:ReportName[];
  selectedRepo:ReportName;
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
  onSelect(report: ReportName): void {
    this.selectedRepo = report;
  }
}
