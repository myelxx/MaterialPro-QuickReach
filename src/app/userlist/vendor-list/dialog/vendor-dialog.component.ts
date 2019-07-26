import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendor-dialog.component.html',
  styleUrls: ['./vendor-dialog.component.css']
})
export class VendorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendorDialogComponent>, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  saveDetails(){
    this.openSnackBar(`Successful!`, '' );
  }

}
