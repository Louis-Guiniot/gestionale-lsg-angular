import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsUpdateRoutingModule } from './products-update-routing.module';
import { ProductsUpdateComponent } from './main/products-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductsUpdateComponent],
  imports: [
    CommonModule,
    ProductsUpdateRoutingModule,
    SharedModule
  ]
})
export class ProductsUpdateModule { }
