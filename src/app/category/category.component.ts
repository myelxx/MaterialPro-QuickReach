import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action'];
  dataSource = new MatTableDataSource<CategoryData>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
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

export interface CategoryData {
  name: string;
  id: number;
  description: string;
  status: boolean;
}

const ELEMENT_DATA: CategoryData[] = [
  {id: 1, name: 'Shoes', description: 'This is a shoes description', status: true},
  {id: 2, name: 'Bag', description:'This is a bag description', status: true},
  {id: 3, name: 'Mens Wear', description: 'This is a mens wear description', status: true},
  {id: 4, name: 'Womens Wear', description: 'This is a womens wear description', status: false},
  {id: 5, name: 'Pants', description: 'This is a pants description', status: false},
  {id: 6, name: 'Shirt', description: 'This is a shirt description', status: true},
  {id: 7, name: 'Skirt', description: 'This is a skirt description', status: false}
];
