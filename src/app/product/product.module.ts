import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent } from './product.component';
import { ProductRoutes } from './product.routing';
import { DialogBoxComponent } from './dialog/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ProductRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent, DialogBoxComponent],
  entryComponents: [DialogBoxComponent]
})
export class ProductModule { }
