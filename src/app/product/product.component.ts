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
    this.initProductForm(true);
    this.displayProduct();

    //this.items.paginator = this.paginator;
  }

  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        imgURL: ['', Validators.required],
        price: ['', Validators.required]
      });
    } else {
      this.productForm = this.fb.group({
        id: [this.productAdd.id],
        name: [this.productAdd.name, Validators.required],
        description: [this.productAdd.description, Validators.required],
        imgURL: [this.productAdd.imgURL, Validators.required],
        price: [this.productAdd.price, Validators.required]
      });
    }
  }

  assignProductFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.productForm.value);

    if (isNew) {
      this.productAdd = {}
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imgURL = formValues['imgURL'];
      this.productAdd.price = formValues['price'];
    } else {
      this.productAdd = {}
      this.productAdd.id = formValues['id'];
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imgURL = formValues['imgURL'];
      this.productAdd.price = formValues['price'];
    }
  }


  displayProduct() {
    this._quickreachService.getItem().subscribe(data => this.items = data, error => this.errorMsg = error);
  }

  addProduct() {
    // ''this.productAdd.id = this.items.slice(-1).find( x => this.id = x.id+1);''
    this.assignProductFormValue(true)
    this._quickreachService.addItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
        alert('added');
      }, error => { this.errorMsg = error });
    console.log(this.productForm.value)
  }

  updateProduct() {
    this.assignProductFormValue(false)
    this._quickreachService.updateItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.displayProduct();
        this.mode = "Create";
        alert('updated');
      }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addProduct()
    } else {
      this.updateProduct()
    }
  }

  showProduct() {
    this.isVisible = !this.isVisible;
    this.mode = "Create";
    this.initProductForm(true);
  }

  showUpdateForm(item: any) {
    this.isVisible = !this.isVisible;

    this.productAdd.id = item.id;
    this.productAdd.name = item.name;
    this.productAdd.description = item.description;
    this.productAdd.price = item.price;
    this.productAdd.imgURL = item.imgURL;
    this.mode = "Edit"
    this.initProductForm(false);
  }

  deleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this._quickreachService.deleteItem(id)
        .subscribe(data => { alert('deleted'), this.displayProduct() }, error => this.errorMsg = error);
    } else {
      alert('canceled deletion')
    }

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
      if (result.event == 'Add') {
        this.addRowData(result.data);
        this.addProduct()
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
        this.updateProduct();
      } else if (result.event == 'Delete') {
        this.deleteProduct(result.data);
        this.deleteRowData(result.data);
      }
    });
  }

  display() {
    return this.items.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  addRowData(row_obj) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      description: row_obj.description,
      price: row_obj.price,
      imgURL: row_obj.imgURL,
      isActive: row_obj.isActive
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
        value.description = row_obj.description,
          value.price = row_obj.price,
          value.imgURL = row_obj.imgURL,
          value.isActive = row_obj.isActive
      }
      return true;
    });
  }

  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }

}
