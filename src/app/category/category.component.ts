import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from './category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action'];
    dataSource = new MatTableDataSource<CategoryData>(ELEMENT_DATA);
    mode: string = "Create";
    title: string = "Category";
    items: any[] = [];
    errorMsg: string = "";
    isVisible: boolean = false;

    categoryForm: FormGroup;
    categoryAdd: any = {};
    searchString: string = "";

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private _quickreachService: CategoryService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.initCategoryForm(true);
        this.displayCategory();
        console.log(this.items);
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
                id: [this.categoryAdd.id],
                name: [this.categoryAdd.name, Validators.required],
                description: [this.categoryAdd.description, Validators.required]
            });
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
            this.categoryAdd.id = formValues['id'];
            this.categoryAdd.name = formValues['name'];
            this.categoryAdd.description = formValues['description'];
        }
    }

    displayCategory() {
        this._quickreachService.getCategories().subscribe(data => this.items = data, error => this.errorMsg = error);
    }

    addCategory() {
        this.assignCategoryFormValue(true)
        this._quickreachService.addCategory(this.categoryAdd)
            .subscribe(data => {
                this.initCategoryForm(true);
                this.displayCategory();
            }, error => { this.errorMsg = error });
        console.log(this.categoryForm.value)
    }

    updateCategory() {
        this.assignCategoryFormValue(false)
        this._quickreachService.updateCategory(this.categoryAdd)
            .subscribe(data => {
                this.initCategoryForm(true);
                this.displayCategory();
                this.mode = "Create";
            }, error => { this.errorMsg = error });
    }

    submitForm() {
        if (this.mode == "Create") {
            this.addCategory()
        } else {
            this.updateCategory()
        }
    }

    showCategory() {
        this.isVisible = !this.isVisible;
        this.mode = "Create";
        this.initCategoryForm(true);
    }

    showUpdateForm(item: any) {
        this.isVisible = !this.isVisible;

        this.categoryAdd.id = item.id;
        this.categoryAdd.name = item.name;
        this.categoryAdd.description = item.description;
        this.mode = "Edit"
        this.initCategoryForm(false);
    }

    deleteCategory(id: number) {
        if (confirm('Do you want to delete this product?')) {
            this._quickreachService.deleteCategory(id)
                .subscribe(data => { this.displayCategory() }, error => { this.errorMsg = error });
        } else {
            alert('canceled deletion')
        }
    }

    display() {
        return this.items.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase()));
    }


    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '50%',
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event == 'AddCat') {
                //this.addProduct()
            } else if (result.event == 'AddSub') {
                //this.updateProduct();
            } else if (result.event == 'Update') {
                //this.updateProduct();
            } else if (result.event == 'Delete') {
                //this.deleteProduct(result.data);
            }
        });
    }

}

export interface CategoryData {
    name: string;
    id: number;
    description: string;
    status: boolean;
}

const ELEMENT_DATA: CategoryData[] = [
    { id: 1, name: 'Shoes', description: 'This is a shoes description', status: true },
    { id: 2, name: 'Bag', description: 'This is a bag description', status: true },
    { id: 3, name: 'Mens Wear', description: 'This is a mens wear description', status: true },
    { id: 4, name: 'Womens Wear', description: 'This is a womens wear description', status: false },
    { id: 5, name: 'Pants', description: 'This is a pants description', status: false },
    { id: 6, name: 'Shirt', description: 'This is a shirt description', status: true },
    { id: 7, name: 'Skirt', description: 'This is a skirt description', status: false }
];
