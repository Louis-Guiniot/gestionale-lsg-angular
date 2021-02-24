import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabbedInvoicesRoutingModule } from './tabbed-invoices-routing.module';
import { TabbedInvoicesComponent } from './main/tabbed-invoices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [TabbedInvoicesComponent],
  imports: [
    CommonModule,
    TabbedInvoicesRoutingModule,
    SharedModule,
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TabbedInvoicesModule { }

