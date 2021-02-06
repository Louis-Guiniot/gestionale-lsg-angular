import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './main/customer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    NgbModule,
  ],
  exports: [CustomerComponent],
  bootstrap: [CustomerComponent],
  providers: [DecimalPipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CustomerModule { }
