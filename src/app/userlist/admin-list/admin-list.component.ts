import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
// import { DialogBoxComponent } from './dialog/dialog-box.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  name: string;
  id: number;
  email: string;
  dtCreated: string;
  isActive: boolean;
}

const ELEMENT_DATA: UserData[] = [
  {id: 1, name: 'Dino Reyes', email: 'a@gmail.com', dtCreated: '25/07/2019', isActive: true},
  {id: 2, name: 'Melrose Mejidana', email: 'myel@gmail.com', dtCreated: '25/07/2019', isActive: true}
  ];

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'imgURL', 'isActive', 'action'];
  dataSource = ELEMENT_DATA;
  
  searchString: string = "";
  
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }
  

}
