import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './main/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      HomeRoutingModule,
      SharedModule
    ]
  })
export class HomeModule{ }