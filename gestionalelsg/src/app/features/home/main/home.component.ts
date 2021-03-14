import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { selectIva } from 'src/app/redux/iva';
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
  collectionIva: number

  constructor(private store: Store, private homeService: HomeService, private fb: FormBuilder, private router: Router) {
    console.log("siamo nel costruttore")
    this.homeService.retreiveAllCustomers();
    this.homeService.retrieveAllInvoices();
    this.homeService.retrieveAllMeasures();
    this.homeService.retrieveAllProducts();
    this.homeService.retreiveAllIva();

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

    this.store.pipe(select(selectIva)).subscribe((ivas) => {
      this.collectionIva = ivas.length;
    })

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

  redirectToIva() {
    this.router.navigateByUrl("/iva")
  }

}
