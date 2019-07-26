import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { DialogComponent } from './dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CategoryRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CategoryComponent, DialogComponent],
  entryComponents: [DialogComponent]
})
export class CategoryModule { }
