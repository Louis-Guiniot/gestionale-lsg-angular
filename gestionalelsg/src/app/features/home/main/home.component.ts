import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { MeasureUnit } from 'src/app/core/model/MeasureUnit.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { selectMeasures } from 'src/app/redux/measure';
import { selectProducts } from 'src/app/redux/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  collectionCust: number
  collectionProd: number
  collectionMeas: number
  collectionInvo: number

  constructor(private store: Store, private homeService: HomeService, private fb: FormBuilder, private router: Router) {
    console.log("siamo nel costruttore")
    this.homeService.retreiveAllCustomers();
    this.homeService.retrieveAllInvoices();
    this.homeService.retrieveAllMeasures();
    this.homeService.retrieveAllProducts();

  }

  ngOnInit(): void {

    this.store.pipe(select(selectCustomers)).subscribe((customer) => {
      this.collectionCust = customer.length;
    })

    this.store.pipe(select(selectProducts)).subscribe((customer) => {
      this.collectionProd = customer.length;
    })

    this.store.pipe(select(selectInvoices)).subscribe((customer) => {
      this.collectionInvo = customer.length;
    })

    this.store.pipe(select(selectMeasures)).subscribe((customer) => {
      this.collectionMeas = customer.length;
    })

  }

  get prods(): Observable<Product[]> {
    return this.store.pipe(select(selectProducts));
  }

  get measures(): Observable<MeasureUnit[]> {
    return this.store.pipe(select(selectMeasures));
  }

  get custs(): Observable<Customer[]> {
    return this.store.pipe(select(selectCustomers));
  }

  get invoices(): Observable<Invoice[]> {
    return this.store.pipe(select(selectInvoices));
  }

  redirectToCust() {
    this.router.navigateByUrl("/customers")

  }

  redirectToProd() {
    this.router.navigateByUrl("/products")

  }

  redirectToInvo() {
    this.router.navigateByUrl("/tabbed/invoices")

  }

  redirectToMeas() {
    this.router.navigateByUrl("/measureunit")

  }

}
