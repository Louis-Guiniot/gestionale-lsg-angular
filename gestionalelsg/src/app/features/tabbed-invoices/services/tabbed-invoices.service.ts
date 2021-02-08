import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createInvoice, deleteInvoice, retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class TabbedInvoicesService {

  constructor(private store: Store) { }

  create(custId:string,payCondition:string, docType:string,sale:string,articles:string,taxable:string){
    this.store.dispatch(createInvoice({custId,payCondition,docType,sale,articles,taxable}))

  }
  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  deleteInvoice(id:string){
    this.store.dispatch(deleteInvoice({id}))
  }
}
