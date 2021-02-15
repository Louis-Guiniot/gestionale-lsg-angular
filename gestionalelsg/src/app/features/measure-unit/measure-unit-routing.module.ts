import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasureUnitComponent } from './main/measure-unit.component';

const routes: Routes = [{ path: '', component: MeasureUnitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasureUnitRoutingModule { }
