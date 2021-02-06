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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerEffects } from './redux/customer/customer.effects';
import { MeasureEffects } from './redux/measure/measure.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
      CustomerEffects,
      MeasureEffects
       
     ]
     ),
     NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
