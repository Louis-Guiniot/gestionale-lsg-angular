import { NgModule } from '@angular/core';
import { TabbedInvoicesRoutingModule } from './tabbed-invoices-routing.module';
import { TabbedInvoicesComponent } from './main/tabbed-invoices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [TabbedInvoicesComponent],
  imports: [
    TabbedInvoicesRoutingModule,
    SharedModule,
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TabbedInvoicesModule { }

