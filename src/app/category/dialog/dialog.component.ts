import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  errorMsg: string;
  mode: string = "Create";

  local_data: any;
  action: string;

  //hold sub category to remove
  subCategoryToRemove: any;

  subCategoryForm: FormGroup;
  categoryForm: FormGroup;
  categoryAdd: any = {};
  subCategory: any = {};
  categoryList: string[] = ['Shoes', 'Shirt', 'Skirt', "Women's Wear", "Men's Wear", 'School Supplies'];
  displayedSubCategory: any = [];
  productForm: FormGroup;
  productAdd: any = {};
  isVisible: number = 1;
  isVisibleId: boolean = true;

  status: string = "";
  isActive: boolean = true;

  searchString: string = "";

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, private _snackBar: MatSnackBar,
    private _quickreachService: CategoryService, private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public category: any) {
    this.local_data = { ...category };
    this.mode = this.local_data.action;

    if (this.category.action == "Create") {
      this.initCategoryForm(true);
      this.isVisibleId = false;
      this.isActive = false;
    } else if (this.category.action == "AddSub") {
      this.initSubCategoryForm();
      this.isVisible = 4;
    } else if (this.category.action == "Update") {
      this.initCategoryForm(false);
      this.isActive = this.category.isActive;
    } else if (this.category.action == "View Sub") {
      this.isVisible = 3;
      this.displaySubCategory(category.id);
    } else if (this.category.action == "Delete") {
      this.isVisible = 2;
    } else if (this.category.action == "DeleteSub") {
      this.isVisible = 5;
      this.subCategoryToRemove = this.category;
    } else {
      this.initCategoryForm(true);
    }

    if (this.category.isActive) {
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



  onNoClick(): void {
    this.dialogRef.close();
  }

  slideToggle() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {

  }

  initCategoryForm(isNew: boolean) {
    if (isNew) {
      this.categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    } else {
      this.categoryForm = this.fb.group({
        id: [this.category.id],
        name: [this.category.name, Validators.required],
        description: [this.category.description, Validators.required]
      });
      this.categoryForm.controls['id'].disable();
      console.log(this.categoryForm);
    }
  }

  initSubCategoryForm() {
    this.subCategoryForm = this.fb.group({
      sub_id: ['']
    });
  }

  assignCategoryFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.categoryForm.value);

    if (isNew) {
      this.categoryAdd = {}
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
      this.categoryAdd.isActive = this.isActive;
    } else {
      this.categoryAdd = {}
      this.categoryAdd.id = this.category.id;
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
      this.categoryAdd.isActive = this.isActive;
    }
  }

  assignSubCategoryFormValue() {
    const formValues = Object.assign({}, this.subCategoryForm.value);
    this.subCategory = {}
    this.subCategory.id = Number(formValues['sub_id']);
    this.subCategory.name = "null";
    this.subCategory.description = "null";
  }

  displaySubCategory(id: number) {
    this._quickreachService.getSubCategories(id).subscribe(data => { this.displayedSubCategory = data; }, error => this.errorMsg = error);
  }

  addCategory() {
    this.assignCategoryFormValue(true)
    this._quickreachService.addCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.onNoClick();
        this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
        alert('added');
      }, error => { this.errorMsg = error });
    console.log(this.categoryForm.value)
  }

  addSubCategory() {
    this.assignSubCategoryFormValue()
    this._quickreachService.getSpecificCategory(this.subCategory.id)
      .subscribe(data => {
        // console.log(data)
        this.subCategory = data;
        // this.onNoClick();
      }, error => { this.errorMsg = error });

    this._quickreachService.addSubCategory(this.category.id, this.subCategory)
      .subscribe(data => {
        this.initSubCategoryForm();
        this.onNoClick();
      }, error => { this.errorMsg = error });
  }

  updateCategory() {
    this.assignCategoryFormValue(false)
    this._quickreachService.updateCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.onNoClick();
        this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
        alert('updated');
        this.mode = "Create";
      }, error => { this.errorMsg = error });

  }


  deleteCategory() {
    if (confirm('Do you want to delete this product?')) {
      this._quickreachService.deleteCategory(this.category.id)
        .subscribe(data => {
          alert('deleted');
          this.onNoClick();
          this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
        }, error => { this.errorMsg = error });
    } else {
      alert('canceled deletion')
    }
  }

  deleteSubCategory() {
      console.log(`this is`, this.subCategoryToRemove)
      this._quickreachService.deleteSubCategory(this.subCategoryToRemove)
        .subscribe(data => {
          this.onNoClick();
          this.openSnackBar(`Succcessfully ${this.mode}d the Sub Category!`, '');
        }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addCategory()
    } else if (this.mode == "Update") {
      this.updateCategory()
    } else if (this.mode == "AddSub") {
      this.addSubCategory()
    } else {
    }
  }

  //dialog for remove sub category
  openDialog(action, obj) {
    obj.action = action;
    var parent = this.category.id;
    console.log(`sub to delete {0}`, obj)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: obj
    });

    //this.onNoClick();


    dialogRef.afterClosed().subscribe(result => {
      this.onNoClick();
    });
  }

}
