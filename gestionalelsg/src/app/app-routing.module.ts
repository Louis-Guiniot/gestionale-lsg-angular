import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  { path: 'fattura', loadChildren: () => import('./features/fattura/fattura.module').then(m => m.FatturaModule)},
  //{ path: 'products', loadChildren: () => import('./features/prodotto/main/main.module').then(m => m.MainModule) },
  { path: 'customers', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'customer/update', loadChildren: () => import('./features/customer-update/customer-update.module').then(m => m.CustomerUpdateModule) },
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  { path: 'products/update', loadChildren: () => import('./features/products-update/products-update.module').then(m => m.ProductsUpdateModule) },
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
