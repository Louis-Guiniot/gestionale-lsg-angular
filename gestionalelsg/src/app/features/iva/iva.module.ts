import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IvaRoutingModule } from './iva-routing.module';
import { IvaComponent } from './main/iva.component';


@NgModule({
  declarations: [IvaComponent],
  imports: [
    CommonModule,
    IvaRoutingModule
  ]
})
export class IvaModule { }
