import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createIva, deleteIva, retrieveAllIva, updateIva } from 'src/app/redux/iva/iva.actions';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  constructor(private store: Store) {}

  retrieveAllIva(){
    this.store.dispatch(retrieveAllIva());
  }

  createIva(percentualeIva: string, info:string){
    console.log("service iva")
    console.log("percentuale iva service ",percentualeIva)
    console.log("info iva service ",info)
    this.store.dispatch(createIva({percentualeIva, info}))
  }

  updateIva(id:string, percentualeIva: string, info:string) {
    console.log("percentuale iva nuovo service ",percentualeIva)
    console.log("info iva nuova service ",info)
    this.store.dispatch(updateIva({id, percentualeIva, info}))
  }

  deleteIva(idS:string){
    this.store.dispatch(deleteIva({idS}))
  }
}
