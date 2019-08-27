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
    mode: string = "Create";
    title: string = "Category";
    items: any[] = [];
    errorMsg: string = "";
    isVisible: boolean = false;

    dataSource = new MatTableDataSource<CategoryData>(this.items);
    subCategory: any[] = []
    categoryForm: FormGroup;
    categoryAdd: any = {};
    searchString: string = "";

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public dialog: MatDialog, private _quickreachService: CategoryService, private fb: FormBuilder) {
       
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.displayCategory();

        console.log(this.items);
    }


    displayCategory() {
        this._quickreachService.getCategories().subscribe(data => this.items = data, error => this.errorMsg = error);
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
            this.displayCategory();
        });
    }

}

export interface CategoryData {
    name: string;
    id: number;
    description: string;
    isActive: boolean;
}
