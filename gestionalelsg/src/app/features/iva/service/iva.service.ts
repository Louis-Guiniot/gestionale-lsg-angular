import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';
import { createIva, deleteIva, retrieveAllIva } from 'src/app/redux/iva/iva.actions';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  constructor(private store: Store) {}

  retrieveAllIva(){
    this.store.dispatch(retrieveAllIva());
  }

  createIva(percentualeIva: string, info:string){
    this.store.dispatch(createIva({percentualeIva, info}))
  }

  deleteIva(idS:string){
    this.store.dispatch(deleteIva({idS}))
  }
}
