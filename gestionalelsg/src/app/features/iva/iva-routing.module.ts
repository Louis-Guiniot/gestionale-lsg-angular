import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvaComponent } from './iva.component';

const routes: Routes = [{ path: '', component: IvaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IvaRoutingModule { }
