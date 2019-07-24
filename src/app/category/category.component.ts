import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //@ViewChild(MatTable, { static: true }) table: MatTable<any>;

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        //this.addProduct()
      }else if(result.event == 'Update'){
        //this.updateProduct();
      }else if(result.event == 'Delete'){
        //this.deleteProduct(result.data);
      }
    });
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
