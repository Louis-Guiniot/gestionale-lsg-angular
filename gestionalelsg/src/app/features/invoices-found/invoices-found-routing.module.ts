import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesFoundComponent } from './main/invoices-found.component';

const routes: Routes = [{ path: '', component: InvoicesFoundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesFoundRoutingModule { }
