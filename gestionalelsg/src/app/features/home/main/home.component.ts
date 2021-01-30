import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectProducts } from 'src/app/redux/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  elements = [];
  preview = [];
  previewId=[]; //id preview per cancellare prod singolo
  previewPrice=[];//id price preview
  prod: Product;
  prodottiForm: FormGroup;
  prodottiLista: string = "";
  totalPrice: string = "";
  invoice: Invoice;
  sender: FormGroup;

  constructor(private store: Store, private homeService: HomeService, private fb: FormBuilder) {
    console.log("siamo nel costruttore")
   // console.log(this.homeService.retrieveAllProducts());
  }

  ngOnInit(): void {
    // console.log("ng on init");

    // this.prodottiForm = this.fb.group({
    //   id: ['', Validators.required],
    //   customerId: ['', Validators.required],
    //   sconto: ['', Validators.required]
    // })


    // console.log(this.prodottiForm.value.id)

    // this.store.pipe(select(selectProducts)).subscribe((products) => {
    //   for (let prod of products) {
    //     this.elements.push(prod);
    //     console.log(prod);
    //   }
    //   return this.elements
    // })
  }

  // get products(): Observable<Product[]> {
  //   return this.store.pipe(select(selectProducts));
  // }

  // fattura() {

  //   if (this.previewId.length > 0) {

  //     for(let i=0; i<this.previewId.length; i++){
  //       this.prodottiLista=this.prodottiLista+this.previewId[i]+";"
  //       this.totalPrice=this.totalPrice+this.previewPrice[i]+";"
  //     }
  //     console.log("invio fattura");
  //     console.log("PRODOTTI LISTA", this.prodottiLista)
  //     console.log("prezzo finale", this.totalPrice)
  //     console.log("customer id", this.prodottiForm.value.customerId)
  //     console.log("sconto: ", this.prodottiForm.value.sconto)

  //     this.homeService.generateSubmit(this.prodottiLista, this.totalPrice,
  //     this.prodottiForm.value.customerId,
  //     this.prodottiForm.value.sconto)
  //   } else {
  //     console.log("nessun prodotto in lista");
  //   }
  // }

  // aggiungi(id: string, prezzo: string) {
  //   console.log(id)
  //   this.previewId.push(id)
  //   this.previewPrice.push(prezzo)
  //   console.log("preview id: "+ this.previewId)
  //   this.preview.push("id prodotto: "+id+" prezzo: "+prezzo+"$");
  // }

  // clearPreview() {
  //   this.preview.length = 0;
  //   this.prodottiLista = "";
  //   this.totalPrice="";
  // }

  // clearPreviewSelected(i: number){ 
  //   this.previewId.splice(i, 1);
  //   this.preview.splice(i, 1); 
  //   this.previewPrice.splice(i,1) 
    
  // }

}
