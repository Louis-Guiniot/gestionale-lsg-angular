import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsAdded = []
  idAdded:number

  constructor(private store: Store) { }

  addInto(idS:string){
    this.idAdded=Number.parseInt(idS)
    console.log("sono nel service cart")
    this.productsAdded.push(this.idAdded)
    console.log(this.productsAdded)
  }

}
