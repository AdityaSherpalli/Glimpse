import { Component, OnInit } from '@angular/core';
import { GetGraphDataService } from '../services/GetGraphData.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartLabels=['label 1'];
  public pieChartData=['0','0','0','0'];
  public pieChartType='pie';
  comms: any;
  keyss: any;
  spname: string;
  xaxis:string[]=[];
  yaxis:string[]=[];
  _label:string;
  j:number=0;
  constructor(private _getgraphdataservice: GetGraphDataService) { }

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
          this.pieChartLabels=this.xaxis;
          this.pieChartData=this.yaxis;
        }
      );
  }

}
