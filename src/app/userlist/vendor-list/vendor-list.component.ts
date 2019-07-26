import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { VendorDialogComponent } from './dialog/vendor-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})

export class VendorListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<VendorData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(VendorDialogComponent, {
      width: '50%',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'AddCat'){
        //this.addProduct()
      }else if(result.event == 'AddSub'){
        //this.updateProduct();
      }else if(result.event == 'Update'){
        //this.updateProduct();
      }else if(result.event == 'Delete'){
        //this.deleteProduct(result.data);
      }
    });
  }

  constructor(public dialog: MatDialog) { }
}

export interface VendorData {
  name: string;
  id: number;
  email: string;
  status: boolean;
}

const ELEMENT_DATA: VendorData[] = [
  {id: 1, name: 'Mermellah Lion', email: 'mermellion@gmail.com', status: true},
  {id: 2, name: 'Kyla Turtle', email:'kyla@turtle.com', status: true}
]
