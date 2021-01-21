import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from "./redux/product/product.effects";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
       ProductsEffects
     ]
     ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
