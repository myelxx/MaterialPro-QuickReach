import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { AdminDialogComponent } from './dialog/admin-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})

export class AdminListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<AdminData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(AdminDialogComponent, {
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

export interface AdminData {
  name: string;
  id: number;
  email: string;
  status: boolean;
}

const ELEMENT_DATA: AdminData[] = [
  {id: 1, name: 'Melrose Mejidana', email: 'myel@gmail.com', status: true},
  {id: 2, name: 'Dino Reyes', email:'dino@gmail.com', status: true}
]
