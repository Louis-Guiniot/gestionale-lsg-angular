import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from "./redux/product/product.effects";
import { CoreModule } from './core/core.module';
import { FatturaComponent } from './features/fattura/main/fattura.component';
import { InvoicesEffects } from './redux/invoice/invoice.effects';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HttpModule,
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
      InvoicesEffects, 
      ProductsEffects,
       
     ]
     ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
