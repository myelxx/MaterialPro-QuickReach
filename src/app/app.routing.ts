import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/pages/login',
        pathMatch: 'full'
      },
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'pages',
        loadChildren:
          './pages/pages.module#PagesModule'
      },
      {
        path: 'userlist',
        loadChildren:
          './userlist/userlist.module#UserlistModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/mat-icon.module#IconsModule'
      }
    ]
  }
];
