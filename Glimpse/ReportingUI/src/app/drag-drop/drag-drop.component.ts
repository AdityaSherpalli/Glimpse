import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { GetGraphDataService } from '../services/GetGraphData.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  simpleDrop: any = null;
  chartType: string;
  displayName: string;
  spName: string;

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
  /*************************************************************************/
  chartOptions = { responsive: true };
  chartData = [{ data: ['0', '0', '0', '0'], label: 'label A' }];
  chartLabels = ['1', '2', '3', '4'];
  /***************************************************************************/
  public pieChartLabels = ['label 1'];
  public pieChartData = ['0', '0', '0', '0'];
  public pieChartType = 'pie';
  /************************************************************************/
  xaxis: string[] = [];
  yaxis: string[] = [];
  _label: string=null;
  comms: any;
  keyss: any;
  j: number = 0;

  constructor(public dialog: MatDialog, private _getgraphdataservice: GetGraphDataService) { }


  dropped(event: any) {
    this.simpleDrop = event;
    console.log(this.chartType);
    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      width: '250px',
      data: { displayName: this.displayName, spName: this.spName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.displayName = result.displayName;
      this.spName = result.spName;
      this.xaxis = [];
      this.yaxis = [];
      this.renderChart();
    });
    this.chartType = event.dragData;
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
                this._label = key;
                this.yaxis[i] = this.comms[i][key]
              }
            }
            this.j = 0;
          }
        }
      );
      console.log(this._label);
    if (this.chartType == 'bar') {
      this.renderBar();
    }
    else if (this.chartType == 'line') {
      this.renderLine();
    }
    else if (this.chartType == 'pie') {
      this.renderPie();
    }
  }
  renderBar() {
    this.barChartLabels = this.xaxis;
    this.barChartData = [
      { data: this.yaxis, label: this._label }
    ];
  }
  renderPie() {
    this.pieChartLabels = this.xaxis;
    this.pieChartData = this.yaxis;
  }
  renderLine() {
    this.chartData = [
      { data: this.yaxis, label: this._label }
    ];
    this.chartLabels = this.xaxis;
  }
}
