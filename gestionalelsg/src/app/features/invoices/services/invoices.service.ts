import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createInvoice, deleteInvoice, retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private store: Store) { }

  create(products:string,date:string,sale:string,imponibile:string,condizionePagamento:string,docType:string,idCustomer:string){
    this.store.dispatch(createInvoice({products,date,sale,imponibile,condizionePagamento,docType,idCustomer}))

  }
  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  deleteProduct(id:string){
    this.store.dispatch(deleteInvoice({id}))
  }
}
