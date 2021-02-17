import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { lookForInvoices } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class InvoicesFoundService {

  constructor(private store:Store) { }

  retrieveFound(termine:string){
    this.store.dispatch(lookForInvoices({termine}))
  }
}
