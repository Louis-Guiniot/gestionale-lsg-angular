import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeasureComponent } from './measure.component';

const routes: Routes = [{ path: '', component: MeasureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasureRoutingModule { }
