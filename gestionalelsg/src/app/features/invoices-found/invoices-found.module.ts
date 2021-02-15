import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesFoundRoutingModule } from './invoices-found-routing.module';
import { InvoicesFoundComponent } from './main/invoices-found.component';


@NgModule({
  declarations: [InvoicesFoundComponent],
  imports: [
    CommonModule,
    InvoicesFoundRoutingModule
  ]
})
export class InvoicesFoundModule { }
