import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserlistRoutes } from './userlist.routing';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserlistRoutes),
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    AdminListComponent,
    CustomerListComponent,
    VendorListComponent
  ]
})
export class UserlistModule { }
