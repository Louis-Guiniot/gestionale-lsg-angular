import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './main/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      HomeComponent,
      SharedModule
    ]
  })
export class HomeModule{ }