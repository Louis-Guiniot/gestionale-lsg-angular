import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createInvoice, deleteInvoice, lookForInvoices, retrieveAllInvoices, updateInvoice } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class TabbedInvoicesService {

  constructor(private store: Store) { }

  create(custId:string,payCondition:string, docType:string,sale:string,idItemsString:string,qntItemsString: string){
    this.store.dispatch(createInvoice({custId,payCondition,docType,sale,idItemsString,qntItemsString}))

  }
  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  deleteInvoice(idS:string){
    this.store.dispatch(deleteInvoice({idS}))
  }

  cerca(termine:string){
    this.store.dispatch(lookForInvoices({termine}))
  }

  updateInvoice(idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, taxable: string,
    qntItemsString: string, saleImport: string){
      console.log(idS, custId,  payCondition, docType, sale, idItemsString, taxable, qntItemsString, saleImport);
    this.store.dispatch(updateInvoice({idS, custId,  payCondition, docType, sale, idItemsString, taxable, qntItemsString, saleImport}))
  }
}
