//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

export interface ProductData {
    name: string;
    id: number;
    description: string;
    price: number;
    imgURL: string;
    isActive: boolean;
}
 
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
 
  action:string;
  local_data:any;

 
  constructor(private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;

  }
 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  doAction(){
    let result = this.action;
    this.dialogRef.close({event:this.action,data:this.local_data});
    this.openSnackBar(`Succcessfully ${result} the Products!`, this.action );
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 
}