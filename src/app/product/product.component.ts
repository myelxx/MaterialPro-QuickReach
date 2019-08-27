import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog/dialog-box.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export interface ProductData {
  name: string;
  id: number;
  description: string;
  price: number;
  imgURL: string;
  isActive: boolean;
}

const ELEMENT_DATA: ProductData[] = [];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'imgURL', 'isActive', 'action'];
  dataSource = ELEMENT_DATA;

  searchString: string = "";

  mode: string = "Create";
  categoriesList: any[] = [];
  items: any[] = [];
  errorMsg: string = "";
  isVisible: boolean = false;
  productForm: FormGroup;
  productAdd: any = {};

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private _quickreachService: ProductService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.displayProduct();

    //this.items.paginator = this.paginator;
  }


  displayProduct() {
    this._quickreachService.getItem().subscribe(data => this.items = data, error => this.errorMsg = error);
  }


  applyFilter() {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase()))
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
        this.displayProduct();
    });
  }

  display() {
    return this.items.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }


}
