import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { GetGraphDataService } from '../services/GetGraphData.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  simpleDrop={};
  chartType={};
  displayName={};
  spName: string;
  visible: boolean = true;
  barChartLabels={};
  pieChartLabels={};
  lineChartLabels={};
  barChartData={};
  lineChartData={};
  pieChartData={};
  _label={};
  id:string;


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //public barChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
  public barChartType = 'bar';
  public barChartLegend = true;
  /*public barChartData = [
    { data: ['0', '0', '0', '0', '0', '0', '0'], label: 'series A' },
    { data: ['0', '0', '0', '0', '0', '0', '0'], label: 'series B' }
  ];*/
  /*************************************************************************/
  chartOptions = { responsive: true };
 // chartData = [{ data: ['0', '0', '0', '0'], label: 'label A' }];
  //chartLabels = ['1', '2', '3', '4'];
  /***************************************************************************/
  //public pieChartLabels = ['label 1'];
  //public pieChartData = ['0', '0', '0', '0'];
  public pieChartType = 'pie';
  /************************************************************************/
  xaxis: string[] = [];
  yaxis: string[] = [];
  arr:string[]=['1','2'];
  arr1:string[]=['0','1','2'];
  comms: any;
  keyss: any;
  j: number = 0;

  constructor(public dialog: MatDialog, private _getgraphdataservice: GetGraphDataService) {
    this.pieChartData=new Map<string, string[]>();
    this.lineChartData=new Map<string, string[]>();
    this.barChartData=new Map<string, string[]>();
    this.pieChartLabels=new Map<string, string[]>();
    this.lineChartLabels=new Map<string, string[]>();
    this.barChartLabels=new Map<string, string[]>();
    this.simpleDrop=new Map<string,string[]>();
    this.chartType=new Map<string,string>();
    this._label=new Map<string,string>();
    this.displayName=new Map<string,string>();
   }

  OnInit()
  {
    this.visible=true;
  }
  dropped(a:string,event:any) {
    this.id=a;
    this.chartType[this.id] = event.dragData;
    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      width: '250px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.displayName[this.id] = result.displayName;
      this.spName = result.spName;
      console.log(this.spName+this.displayName);
      this.xaxis = [];
      this.yaxis = [];
      this.renderChart();
    });
  }
  renderChart() {
    this._getgraphdataservice.getData(this.spName)
      .subscribe
      (
        data => {
          this.comms = data;
          if (this.comms.length != 0) this.keyss = Object.keys(this.comms[0]);
          for (var i = 0; i < this.comms.length; i++) {
            for (let key of this.keyss) {
              this.j = this.j + 1;
              if (this.j == 1) {
                this.xaxis[i] = this.comms[i][key]
              }
              else {
                this._label[this.id] = key;
                this.yaxis[i] = this.comms[i][key]
              }
            }
            this.j = 0;
          }
        }
      );
    if (this.chartType[this.id] == 'bar') {
      this.renderBar();
    }
    else if (this.chartType[this.id] == 'line') {
      this.renderLine();
    }
    else if (this.chartType[this.id] == 'pie') {
      this.renderPie();
    }
  }
  renderBar() {
    this.barChartLabels[this.id] = this.xaxis;
    this.barChartData[this.id] = [
      { data: this.yaxis, label: this._label[this.id] }
    ];
    this.simpleDrop[this.id] = "1";
    console.log(this.barChartData);
    console.log(this.barChartLabels[this.id]);
  }
  renderPie() {
    this.pieChartLabels[this.id] = this.xaxis;
    this.pieChartData[this.id] = this.yaxis;
    this.simpleDrop[this.id] = "1";
    console.log(this.pieChartData);
    console.log(this.pieChartLabels);
  }
  renderLine() {
    this.lineChartData[this.id] = [
      { data: this.yaxis, label: this._label[this.id] }
    ];
    this.lineChartLabels[this.id] = this.xaxis;
    this.simpleDrop[this.id] = "1";
    console.log(this.lineChartData);
    console.log(this.lineChartLabels);
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("mySidenav1").style.marginLeft = "200px";
    document.getElementById("main").style.marginLeft = "220px"
    this.visible = true;
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("mySidenav1").style.marginLeft = "0px";
    document.getElementById("main").style.marginLeft = "20px"
    this.visible = false;
  }
}
