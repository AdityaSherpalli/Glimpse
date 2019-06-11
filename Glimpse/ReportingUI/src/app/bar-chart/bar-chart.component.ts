import { Component, OnInit } from '@angular/core';
import { GetGraphDataService } from '../services/GetGraphData.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: ['0', '0', '0', '0', '0', '0', '0'], label: 'series A' },
    { data: ['0', '0', '0', '0', '0', '0', '0'], label: 'series B' }
  ];
  constructor(private _getgraphdataservice: GetGraphDataService) { 
  }
  comms: any;
  keyss: any;
  spname: string;
  xaxis:string[]=[];
  yaxis:string[]=[];
  _label:string;
  j:number=0;
  ngOnInit() {
  }
  OnSubmit(title: string) {
    this.spname = title;
    this.xaxis=[];
    this.yaxis=[];
    this.GetData();
  }
  GetData() {
    this._getgraphdataservice.getData(this.spname)
      .subscribe
      (
        data => {
          this.comms = data;
          if (this.comms.length != 0) this.keyss = Object.keys(this.comms[0]);
          for (var i = 0; i < this.comms.length; i++) {
            for (let key of this.keyss) {
              this.j=this.j+1;
              if(this.j==1)
              {
                  this.xaxis[i]=this.comms[i][key]
              }
              else
              {
                this._label=key;
                this.yaxis[i]=this.comms[i][key]
              }
            }
            this.j=0;
          }
          this.barChartLabels=this.xaxis;
          this.barChartData=[
            {data:this.yaxis,label:this._label}
          ];
        }
      );
  }
}
