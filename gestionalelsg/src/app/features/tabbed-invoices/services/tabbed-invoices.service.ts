import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retreiveAllDoc } from 'src/app/redux/doctype/doctype.actions';
import { createInvoice, deleteInvoice, lookForInvoices, retrieveAllInvoices, updateInvoice } from 'src/app/redux/invoice/invoice.actions';
import { retreiveAllPayConditions } from 'src/app/redux/paycondition/payCondition.actions';
import { createPhi, deletePhi, retrieveAllPhi } from 'src/app/redux/product-has-invoice/phi.actions';
import { findProdById } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class TabbedInvoicesService {

  constructor(private store: Store) { }

  create(custId:string,payCondition:string, docType:string,sale:string,idItemsString:string,qntItemsString: string, iva: string){
    this.store.dispatch(createInvoice({custId,payCondition,docType,sale,idItemsString,qntItemsString, iva}))
  }

  createPhi(idProduct: string,qtaProduct:string){
    this.store.dispatch(createPhi({idProduct,qtaProduct}))
  }

  deletePhi(idProduct: string,qtaProduct:string){
    this.store.dispatch(deletePhi({idProduct,qtaProduct}))
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

  updateInvoice(idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string,
    qntItemsString: string, iva: string){
      console.log(idS, custId,  payCondition, docType, sale, idItemsString, qntItemsString, iva);
    this.store.dispatch(updateInvoice({idS, custId,  payCondition, docType, sale, idItemsString, qntItemsString, iva}))
  }

  retreiveAllPayConditions(){
    this.store.dispatch(retreiveAllPayConditions())
  }

  retreiveAllDocumentsType(){
    this.store.dispatch(retreiveAllDoc())    
  }

  retriveAllProductFromInvoice(){
    this.store.dispatch(retrieveAllPhi())
  }

  findProdById(ids : string){
    this.store.dispatch(findProdById({ids}))
  }
}
