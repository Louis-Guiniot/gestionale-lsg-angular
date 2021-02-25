import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MeasureUnitComponent } from './main/measure-unit.component';
import { MeasureUnitRoutingModule } from './measure-unit-routing.module';


@NgModule({
  declarations: [MeasureUnitComponent],
  imports: [
    MeasureUnitRoutingModule,
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MeasureUnitModule { }
