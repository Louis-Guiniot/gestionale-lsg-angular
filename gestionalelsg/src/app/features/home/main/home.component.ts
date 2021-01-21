import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/model/Product.interface';
import { selectProducts } from 'src/app/redux/home';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private store: Store, private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.retrieveAllProducts();
  }

  get skills(): Observable<Product[]> {
    return this.store.pipe(select(selectProducts));
  }

}
