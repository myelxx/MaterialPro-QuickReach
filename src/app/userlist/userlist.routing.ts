import { Routes } from '@angular/router';

import { AdminListComponent } from './admin-list/admin-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

export const UserlistRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AdminListComponent
      },
      {
        path: 'customer',
        component: CustomerListComponent
      },
      {
        path: 'vendor',
        component: VendorListComponent
      }
    ]
  }
];
