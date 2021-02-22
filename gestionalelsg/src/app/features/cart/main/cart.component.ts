import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  constructor(private store: Store, private cartService: CartService) { 
  }

  productsAdded = []
  idAdded;

  ngOnInit(): void {

    console.log("pprimo id"+this.cartService.idAdded)

      this.store.pipe(select(selectProducts)).subscribe((products) => {
      for (let prod of products) {
        if(prod.id == this.cartService.idAdded)
       this.productsAdded.push(prod);
         console.log(prod);
      }
      return this.productsAdded
     })
     
  }
}