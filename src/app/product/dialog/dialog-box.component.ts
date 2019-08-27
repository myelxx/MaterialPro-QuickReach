//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

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
  errorMsg: string;
  mode: string = "Create";

  action: string;
  local_data: any;

  category = new FormControl();
  categoryList: string[] = ['Shoes', 'Shirt', 'Skirt', "Women's Wear", "Men's Wear", 'School Supplies'];

  items: any[] = [];
  isVisible: number = 1;
  isVisibleId: boolean = true;

  productForm: FormGroup;
  productAdd: any = {};
  isActive: boolean = true;
  status: string = "";

  searchString: string = "";

  constructor(private fb: FormBuilder, public dialog: MatDialog, private _quickreachService: ProductService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public product: ProductData) {
    console.log(product);
    this.local_data = { ...product };
    this.mode = this.local_data.action;

    if (this.local_data.action == "Create") {
      this.initProductForm(true);
      this.isVisibleId = false;
      this.isActive = false;
    } else if (this.local_data.action == "Update") {
      this.initProductForm(false);
      this.isActive = this.product.isActive;
    } else if (this.local_data.action == "Delete") {
      this.isVisible = 2;
    } else {
      this.initProductForm(true);
    }

    if(this.product.isActive){
      this.status = "Active"
    } else {
      this.status = "Inactive"
    }      

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  slideToggle(){
    this.isActive = !this.isActive;
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
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        description: [this.product.description, Validators.required],
        imgURL: [this.product.imgURL, Validators.required],
        price: [this.product.price, Validators.required]
      });
      this.productForm.controls['id'].disable();
      
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
      this.productAdd.isActive = this.isActive;
    } else {
      this.productAdd = {}
      this.productAdd.id =  this.product.id;
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imgURL = formValues['imgURL'];
      this.productAdd.price = formValues['price'];
      this.productAdd.isActive = this.isActive;
    }
  }

  addProduct() {
    // ''this.productAdd.id = this.items.slice(-1).find( x => this.id = x.id+1);''
    this.assignProductFormValue(true)
    this._quickreachService.addItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.closeDialog();
        this.openSnackBar(`Succcessfully ${this.mode}d the Product!`, '');
        alert('added');
      }, error => { this.errorMsg = error });
    console.log(this.productForm.value)
  }

  updateProduct() {
    console.log(this.productAdd)
    this.assignProductFormValue(false)
    this._quickreachService.updateItem(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.closeDialog();
        this.openSnackBar(`Succcessfully ${this.mode}d the Product!`, '');
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

  deleteProduct() {
    if (confirm('Do you want to delete this product?')) {
      this._quickreachService.deleteItem(this.product.id)
        .subscribe(data => { alert('deleted') }, error => this.errorMsg = error);
    } else {
      alert('canceled deletion')
    }

  }

}