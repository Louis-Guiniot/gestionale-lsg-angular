import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/Product.interface';
import { selectProducts } from 'src/app/redux/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  elements=[];
  prod: Product;
  constructor(private store: Store, private homeService: HomeService) {
    console.log("siamo nel costruttore")
    console.log(this.homeService.retrieveAllProducts());
   }

  ngOnInit(): void {
    console.log("ng on init");
    

    this.store.pipe(select(selectProducts)).subscribe((products) => { 
      for (let prod of products) {
          this.elements.push(prod); 
          console.log(prod);
      }
      return this.elements
    })
  }

  get products(): Observable<Product[]> {
    return this.store.pipe(select(selectProducts));
  }

}
