import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabbedInvoicesComponent } from './main/tabbed-invoices.component';

const routes: Routes = [{ path: '', component: TabbedInvoicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabbedInvoicesRoutingModule { }
