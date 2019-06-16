import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { GetGraphDataService } from '../services/GetGraphData.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  simpleDrop = {};
  chartType = {};
  displayName = {};
  visible: boolean = true;
  barChartLabels = {};
  pieChartLabels = {};
  lineChartLabels = {};
  barChartData = {};
  lineChartData = {};
  pieChartData = {};
  SpName = {};
  _label = {};
  id: string;
  comms={};
  keyss={};
  rows={};
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  chartOptions = { responsive: true };
  public pieChartType = 'pie';
  xaxis: string[] = [];
  yaxis: string[] = [];
  arr: string[] = ['1', '2'];
  arr1: string[] = ['0', '1', '2'];
  j: number = 0;

  constructor(public dialog: MatDialog, private _getgraphdataservice: GetGraphDataService) {
    this.pieChartData = new Map<string, string[]>();
    this.lineChartData = new Map<string, string[]>();
    this.barChartData = new Map<string, string[]>();
    this.pieChartLabels = new Map<string, string[]>();
    this.lineChartLabels = new Map<string, string[]>();
    this.barChartLabels = new Map<string, string[]>();
    this.simpleDrop = new Map<string, string[]>();
    this.chartType = new Map<string, string>();
    this._label = new Map<string, string>();
    this.displayName = new Map<string, string>();
    this.SpName = new Map<string, string>();
    this.comms=new Map<string, any>();
    this.keyss=new Map<string, any>();
    this.rows=new Map<String, number>();
  }

  OnInit() {
    this.visible = true;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  dropped(a: string, event: any) {
    this.id = a;
    console.log(this.id);
    this.chartType[this.id] = event.dragData;
    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      width: '250px',
      data: {chartType: event.dragData}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.displayName[this.id] = result.displayName;
      this.SpName[this.id] = result.spName;
      this.xaxis = [];
      this.yaxis = [];
      this.renderChart();
    });
  }
  renderChart() {
    this._getgraphdataservice.getData(this.SpName[this.id])
      .subscribe
      (
        data => {
          this.comms[this.SpName[this.id]] = data;
          this.rows[this.SpName[this.id]]=this.comms[this.SpName[this.id]].length;
          if (this.rows[this.SpName[this.id]] != 0) this.keyss[this.SpName[this.id]] = Object.keys(this.comms[this.SpName[this.id]][0]);
          for (var i = 0; i < this.rows[this.SpName[this.id]]; i++) {
            for (let key of this.keyss[this.SpName[this.id]]) {
              this.j = this.j + 1;
              if (this.j == 1) {
                this.xaxis[i] = this.comms[this.SpName[this.id]][i][key]
              }
              else {
                this._label[this.id] = key;
                this.yaxis[i] = this.comms[this.SpName[this.id]][i][key]
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
    else if (this.chartType[this.id] == 'table') {
      this.renderTable();
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
  renderTable()
  {
    this.simpleDrop[this.id] = "1";
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
