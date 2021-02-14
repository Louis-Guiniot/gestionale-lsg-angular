import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasureRoutingModule } from './measure-routing.module';
import { MeasureComponent } from './measure.component';


@NgModule({
  declarations: [MeasureComponent],
  imports: [
    CommonModule,
    MeasureRoutingModule
  ]
})
export class MeasureModule { }
