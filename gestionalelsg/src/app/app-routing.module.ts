import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  { path: 'customers', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) },  
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  { path: 'tabbed/invoices', loadChildren: () => import('./features/tabbed-invoices/tabbed-invoices.module').then(m => m.TabbedInvoicesModule) },
  { path: 'measureunit', loadChildren: () => import('./features/measure-unit/measure-unit.module').then(m => m.MeasureUnitModule) },
  { path: 'redirectcustomer', loadChildren: () => import('./redirects/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'redirectproducts', loadChildren: () => import('./redirects/products/products.module').then(m => m.ProductsModule) },
  { path: 'redirectinvoices', loadChildren: () => import('./redirects/invoices/invoices.module').then(m => m.InvoicesModule) },
 
  { path: 'redirectmeasure', loadChildren: () => import('./redirects/measure/measure.module').then(m => m.MeasureModule) },
  { path: 'tabbed/invoices/found', loadChildren: () => import('./features/invoices-found/invoices-found.module').then(m => m.InvoicesFoundModule) },
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
