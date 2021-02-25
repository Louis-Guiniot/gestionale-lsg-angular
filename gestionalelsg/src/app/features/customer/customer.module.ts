import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './main/customer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CustomerRoutingModule,
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CustomerModule { }
