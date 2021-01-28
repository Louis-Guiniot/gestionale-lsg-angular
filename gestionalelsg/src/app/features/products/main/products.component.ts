import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private pruductService: ProductsService, private store: Store, private route: Router) {
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

  update(id:string){
    console.log(id)
    this.route.navigate(["products/update"], {
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
    });
  }

}
