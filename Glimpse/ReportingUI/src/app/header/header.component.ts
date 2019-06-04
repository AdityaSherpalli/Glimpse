import { Component, OnInit } from '@angular/core';
import {GetReportsNameService} from '../services/GetReportsName.service';
import {ReportName} from '../DTO/ReportName'
import{Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _getreportsnameservice:GetReportsNameService,private router:Router) { }
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
    document.getElementById("navbardrop").style.color="white";
  }
}
