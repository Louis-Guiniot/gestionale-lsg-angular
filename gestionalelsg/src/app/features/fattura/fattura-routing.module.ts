import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FatturaComponent } from './main/fattura.component';


const routes: Routes = [{ path: '', component:  FatturaComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FatturaRoutingModule { }
