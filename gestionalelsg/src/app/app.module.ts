import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from "./redux/product/product.effects";
import { CoreModule } from './core/core.module';
import { InvoicesEffects } from './redux/invoice/invoice.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerEffects } from './redux/customer/customer.effects';
import { MeasureEffects } from './redux/measure/measure.effects';
import { NgbAlert, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LoginComponent } from './features/login/main/login.component';
import { SharedModule } from './shared/shared.module';
import { PayConditionEffects } from './redux/paycondition/payCondition.effects';
import { IvaComponent } from './redirects/iva/iva.component';
import { IvaEffects } from './redux/iva/iva.effects';
import { TipoDocumentoEffects } from './redux/tipoDocumento/tipoDocumento.effects';

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
    MatButtonModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule, 
    RadioButtonModule,
    SharedModule,
 
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
      InvoicesEffects, 
      ProductsEffects,
      CustomerEffects,
      MeasureEffects,
      PayConditionEffects,
      IvaEffects,
      TipoDocumentoEffects
       
     ]
     ),
  ],
  providers:[],
  bootstrap: [AppComponent],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule { }
