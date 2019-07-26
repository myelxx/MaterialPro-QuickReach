import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { CustomerDialogComponent } from './dialog/customer-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<CustomerData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
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

export interface CustomerData {
  name: string;
  id: number;
  email: string;
  status: boolean;
}

const ELEMENT_DATA: CustomerData[] = [
  {id: 1, name: 'Cardo Dalisay', email: 'cardz@gmail.com', status: true},
  {id: 2, name: 'Dino Rado', email:'dino@gmail.com', status: true}
]
