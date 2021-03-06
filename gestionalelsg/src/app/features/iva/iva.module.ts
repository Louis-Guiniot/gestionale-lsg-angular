import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IvaRoutingModule } from './iva-routing.module';
import { IvaComponent } from './main/iva.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [IvaComponent],
  imports: [
    CommonModule,
    IvaRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class IvaModule { }
