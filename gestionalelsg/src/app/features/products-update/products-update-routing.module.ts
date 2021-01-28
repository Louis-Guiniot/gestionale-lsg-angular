import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsUpdateComponent } from './main/products-update.component';

const routes: Routes = [{ path: '', component: ProductsUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsUpdateRoutingModule { }
