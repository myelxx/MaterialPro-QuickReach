import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  categoryForm: FormGroup;
  categoryAdd: any = {};
  isVisible: number = 1;
  isVisibleId: boolean = true;

  status: string = "";
  isActive: boolean = true; 

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _snackBar: MatSnackBar,
    private _quickreachService: CategoryService, private fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public category: any) {
    console.log(this.category);
    this.local_data = { ...category };
    this.mode = this.local_data.action;

    if (this.local_data.action == "Create") {
      this.initCategoryForm(true);
      this.isVisibleId = false;
      this.isActive = false;
    } else if (this.local_data.action == "AddSub") {
      this.initCategoryForm(true);
      this.isVisible = 4;
    } else if (this.local_data.action == "Update") {
      this.initCategoryForm(false);
      this.isActive = this.category.isActive;
    } else if (this.local_data.action == "View Sub") {
      this.isVisible = 3;
    } else if (this.local_data.action == "Delete") {
      this.isVisible = 2;
    } else {
      this.initCategoryForm(true);
    }

    if(this.category.isActive){
      this. status = "Active"
    } else {
      this. status = "Inactive"
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

  slideToggle(){
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

  assignCategoryFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.categoryForm.value);

    if (isNew) {
      this.categoryAdd = {}
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    } else {
      this.categoryAdd = {}
      this.categoryAdd.id = this.category.id;
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    }
  }


  addCategory() {
    this.assignCategoryFormValue(true)
    this._quickreachService.addCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.onNoClick();
        this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
      }, error => { this.errorMsg = error });
    console.log(this.categoryForm.value)
  }

  updateCategory() {
    this.assignCategoryFormValue(false)
    this._quickreachService.updateCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.onNoClick();
        this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
        this.mode = "Create";
      }, error => { this.errorMsg = error });

  }


  deleteCategory() {
    this._quickreachService.deleteCategory(this.category.id)
      .subscribe(data => {
        this.onNoClick();
        this.openSnackBar(`Succcessfully ${this.mode}d the Category!`, '');
      }, error => { this.errorMsg = error });
  }

  submitForm() {
    if (this.mode == "Create") {
      this.addCategory()
    } else {
      this.updateCategory()
    }
  }

}
