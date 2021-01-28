import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  elements =[];

  constructor(private pruductService: ProductsService, private store: Store) {
    this.pruductService.retrieveAllProducts();
   }

  ngOnInit(): void {

    this.store.pipe(select(selectProducts)).subscribe((products) => {
      for (let prod of products) {
        this.elements.push(prod);
        console.log(prod);
      }
      return this.elements
    })
  }

}
