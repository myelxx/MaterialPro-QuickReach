import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog/dialog-box.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ProductData {
  name: string;
  id: number;
  description: string;
  price: number;
  imgURL: string;
  isActive: boolean;
}

const ELEMENT_DATA: ProductData[] = [
  {id: 1, name: 'Adidas Shoes', description: 'a', price: 12, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
  {id: 2, name: 'Nike Shoes', description: 'b', price: 145, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
  {id: 3, name: 'Adidas Shoes', description: 'c', price: 4353, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
  {id: 4, name: 'Faber Castle Pen', description: 'e', price: 5353, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
  {id: 5, name: 'Nike Shoes', description: 'd', price: 6443, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
  {id: 6, name: 'Nike Shoes', description: 'f', price: 4242, isActive: true, imgURL: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/oddgxdswqgfhnzbgoubg/juvenate-womens-shoe-nnTjnOM0.jpg'},
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'imgURL', 'isActive', 'action'];
  dataSource = ELEMENT_DATA;
  
  searchString: string = "";
  disabled = false;
  checked = false; 
  
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog) {
  }

  applyFilter() {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase()))
  }
 
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      description: row_obj.description,
      price: row_obj.price,
      imgURL: row_obj.imgURL,
      isActive: row_obj.isActive
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.description = row_obj.description,
        value.price = row_obj.price,
        value.imgURL = row_obj.imgURL,
        value.isActive = row_obj.isActive
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

}
