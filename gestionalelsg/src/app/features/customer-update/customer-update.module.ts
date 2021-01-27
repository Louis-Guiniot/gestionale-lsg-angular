import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerUpdateRoutingModule } from './customer-update-routing.module';
import { CustomerUpdateComponent } from './main/customer-update.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CustomerUpdateComponent],
  imports: [
    CommonModule,
    CustomerUpdateRoutingModule,
    SharedModule
  ]
})
export class CustomerUpdateModule { }
