import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createInvoice, deleteInvoice, retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class TabbedInvoicesService {

  constructor(private store: Store) { }

  create(custId:string,payCondition:string, docType:string,sale:string,articles:string){
    this.store.dispatch(createInvoice({custId,payCondition,docType,sale,articles}))

  }
  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  deleteInvoice(idS:string){
    this.store.dispatch(deleteInvoice({idS}))
  }
}
