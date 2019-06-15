import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';

export interface DialogData{
  displayName: string;
  spName: string;
}
@Component({
  selector: 'app-config-dialog',
  template: 'passed in {{ data.chartType }}',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css']
})
export class ConfigDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data.chartType);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
