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

  elements=[];
  prod: Product;
  prodottiForm: FormGroup;
  prodottiLista: string="";
  totalPrice: string="";
  invoice:Invoice;
  sender: FormGroup;

  constructor(private store: Store, private homeService: HomeService, private fb: FormBuilder) {
    console.log("siamo nel costruttore")
    console.log(this.homeService.retrieveAllProducts());
   }

  ngOnInit(): void {
    console.log("ng on init");
    
     this.prodottiForm=this.fb.group({
      id:['', Validators.required],
      customerId:['', Validators.required]
     })


    console.log(this.prodottiForm.value.id)

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

  fattura(){
    // this.sender=this.fb.group({
    //   prodottiLista: [this.prodottiLista, Validators.required],
    //   totalPrice: [this.totalPrice, Validators.required]
     
    // })
    console.log("invio fattura");
    console.log("PRODOTTI LISTA", this.prodottiLista)
    console.log("prezzo finale", this.totalPrice)
    console.log("customer id", this.prodottiForm.value.customerId)

  

    this.homeService.generateSubmit(this.prodottiLista, this.totalPrice, this.prodottiForm.value.customerId)
  }

  aggiungi(id: string, prezzo:string){
    console.log(id)
    this.prodottiLista=this.prodottiLista+id+";"
    this.totalPrice=this.totalPrice+prezzo+";"
    console.log("lista",this.prodottiLista,"prodotto aggiunto")
    console.log("i limoni signoraaaaa i limonIIIIIIIIHHHHHHH",this.totalPrice)
    
  }

}
