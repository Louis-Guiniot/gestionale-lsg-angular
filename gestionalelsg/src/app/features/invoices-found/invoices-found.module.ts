import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesFoundRoutingModule } from './invoices-found-routing.module';
import { InvoicesFoundComponent } from './main/invoices-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [InvoicesFoundComponent],
  imports: [
    CommonModule,
    InvoicesFoundRoutingModule,
    SharedModule,
    NgbModule,
  ]
})
export class InvoicesFoundModule { }
