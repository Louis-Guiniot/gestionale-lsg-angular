import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { FatturaRoutingModule } from './fattura-routing.module';
import { FatturaComponent } from './main/fattura.component';

@NgModule({
    declarations: [FatturaComponent],
    imports: [
      CommonModule,
      FatturaRoutingModule,
      SharedModule
    ]
  })
export class FatturaModule{ }