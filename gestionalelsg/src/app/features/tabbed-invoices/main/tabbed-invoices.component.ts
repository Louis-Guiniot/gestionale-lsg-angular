import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Customer } from 'src/app/core/model/Customer.interface';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { selectProducts } from 'src/app/redux/product';
import { CustomerService } from '../../customer/services/customer.service';
import { ProductsService } from '../../products/service/products.service';
import { TabbedInvoicesService } from '../services/tabbed-invoices.service';

import { PayCondition } from 'src/app/core/model/PayCondition.interface';
import { selectPayCondition } from 'src/app/redux/paycondition';
import { IvaService } from '../../iva/service/iva.service';
import { Iva } from 'src/app/core/model/Iva.interface';
import { selectIva } from 'src/app/redux/iva';
import { DocumentType } from 'src/app/core/model/DocumentType.interface';
import { selectDocument } from 'src/app/redux/doctype';
import { ProductHasInvoice } from 'src/app/core/model/ProductHasInvoice.interface';
import { selectPhi } from 'src/app/redux/product-has-invoice';
import { HttpCommunicationsService } from 'src/app/core/HttpCommunications/http-communications.service';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';


export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tabbed-invoices',
  templateUrl: './tabbed-invoices.component.html',
  styleUrls: ['./tabbed-invoices.component.scss'],
})


export class TabbedInvoicesComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  
  model: NgbDateStruct;
  placement = 'left';

  //form
  invoiceInsertForm: FormGroup
  invoiceUpdateForm: FormGroup
  cercaForm: FormGroup
  cercaFormN: FormGroup
  invoiceInsertProd: FormGroup

  //dati per update e delete
  idN: number
  idS: string //mandato a ogni metodo redux
  codeD: string

  codeInvoiceS: string //per cancellazione

  closeResult = ''

  //aggiunta prodotti

  idItemsString: string = ""
  qntItemsString: string = ""

  prodCount = 0
  itemQnumber: number

  //paginazione invoice
  collectionSize: number
  page = 1
  pageSize = 2

  //ricerca
  term = 'null'

  //invoice by id
  invoiceFound : any
  arrayInvoiceRecieved : Object = []
  arrayInvoiceProducts = []
  arrayInvoiceFinale = []


  constructor(private store: Store, private router: Router, private productService: ProductsService, private route: Router, private invoicesService: TabbedInvoicesService, private ivaService: IvaService, private customerService: CustomerService, private fb: FormBuilder, private modalService: NgbModal, private http: HttpCommunicationsService) {
    this.invoicesService.retrieveAllInvoices()
    this.customerService.retreiveAllCustomers()
    this.productService.retrieveAllProducts()
    this.invoicesService.retreiveAllPayConditions()
    this.ivaService.retrieveAllIva()
    this.invoicesService.retreiveAllDocumentsType()
    this.invoicesService.retriveAllProductFromInvoice()
  }

  async openXL(content, idInvoice?: string, codeInvoice?: string, isUpdate?:boolean) {

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      this.invoiceInsertForm.reset();
      this.invoiceUpdateForm.reset();
      this.invoiceInsertProd.reset();

      this.arrayFinale = [] //pulisco array finale quando esco da maschera
      this.qntItemsString = "" //pulisco stringa items da mandare a create
      this.idItemsString = "" //pulisco quantità items da mandare a create

    });

    this.idN = Number.parseInt(idInvoice)
      this.idS = idInvoice;
      this.codeD = codeInvoice;

    if(isUpdate){

      
  
      console.log("id invoice: " + this.idN + "code invoice: " + this.codeD)

        this.getInvoice(idInvoice).subscribe(invoice => {

          this.invoiceFound = invoice
          this.arrayInvoiceRecieved = this.invoiceFound
                
        })

        await this.delay(100);
        console.log("item found: " , this.invoiceFound)

        console.log("fields  ", this.invoiceFound.result.fields)

        this.arrayInvoiceProducts.push(
          (this.invoiceFound.result.fields).split(';')
        )

        console.log("array prodotti trovati:   ", this.arrayInvoiceProducts)

      this.arrayInvoiceFinale.push({
        invo:this.invoiceFound
      })

      console.log("array finale invoice: ", this.arrayInvoiceFinale)      


    }else{
      
    }

  }

  openDeleteModal(content, idInvoice?: string, codeInvoice?: string) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

    this.idN = Number.parseInt(idInvoice)
    this.idS = idInvoice;
    this.codeInvoiceS = codeInvoice

    console.log("id invoice to delete: " + this.idN)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {

    console.log(this.term)

    this.store.pipe(select(selectInvoices)).subscribe((invoices) => {
      this.collectionSize = invoices.length;
    })

    this.cercaForm = this.fb.group({
      termine: ['', Validators.required],
    })

    this.invoiceInsertForm = this.fb.group({
      custId: ['', Validators.required],
      payCondition: ['', Validators.required],
      docType: ['', Validators.required],
      sale: ['', Validators.required],
      iva: ['', Validators.required],
    })

    this.invoiceInsertProd = this.fb.group({
      idItem: ['', Validators.required],
      itemQuantity: ['', Validators.required],
    })

    this.invoiceUpdateForm = this.fb.group({
      custId: ['', Validators.required],
      date: ['', Validators.required],
      payCondition: ['', Validators.required],
      docType: ['', Validators.required],
      sale: ['', Validators.required],
      articles: ['', Validators.required],
      taxable: ['', Validators.required],
      quantity: ['', Validators.required],
      saleImport: ['', Validators.required],
      iva: ['', Validators.required],
      ivaPrice: ['', Validators.required],
      totMerce: ['', Validators.required],
      totServices: ['', Validators.required],
    })
  }

  /********** GET CHE ARRIVANO DA REDUX PER AVERE LISTA ***********/

  get invoices(): Observable<Invoice[]> {
    return this.store.pipe(select(selectInvoices))
  }

  get elements(): Observable<Customer[]> {
    return this.store.pipe(select(selectCustomers))
  }

  get products(): Observable<Product[]> {
    return this.store.pipe(select(selectProducts))
  }

  get conditions(): Observable<PayCondition[]> {
    return this.store.pipe(select(selectPayCondition))
  }

  get ivaList(): Observable<Iva[]> {
    return this.store.pipe(select(selectIva))
  }

  get documents(): Observable<DocumentType[]> {
    return this.store.pipe(select(selectDocument))
  }

  get phis(): Observable<ProductHasInvoice[]> {
    return this.store.pipe(select(selectPhi))
  }

  create() {

    this.arrayFinale = [] //pulisco il vettore finale così da poter aggiungere nuovi prodotti post creazione

    this.invoicesService.create(this.invoiceInsertForm.value.custId,
      this.invoiceInsertForm.value.payCondition, this.invoiceInsertForm.value.docType,
      this.invoiceInsertForm.value.sale, this.idItemsString, this.qntItemsString, this.invoiceInsertForm.value.iva
    )

  }

  deleteInv() {
    this.invoicesService.deleteInvoice(this.idS) //elimino invoice tramite id chiamando service
  }

  update() {
    this.invoicesService.updateInvoice(this.idS.toString(),

      this.invoiceUpdateForm.value.custId,
      this.invoiceUpdateForm.value.payCondition,
      this.invoiceUpdateForm.value.docType,
      this.invoiceUpdateForm.value.sale,
      this.idItemsString,
      this.qntItemsString,
      this.invoiceUpdateForm.value.iva

    )
  }


  searchTerm() {
    this.term = this.cercaForm.value.termine
    this.term = this.term.toLowerCase();
    console.log("cerco con termine: ", this.term)
    this.pageSize = 1000
  }

  resetSearchBar() {
    this.term = 'null';
    this.pageSize = 2
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  url: string
  urlInvoice: string

  getProduct(prodottoId: string): Observable<Product> {
    this.url = 'product/findById'
    return this.http.retrievePostCall<Product>(this.url, prodottoId.toString().toString()).pipe()
  }

  getInvoice(invoiceId: string): Observable<Invoice> {
    this.urlInvoice = 'invoice/findInvoiceById'
    return this.http.retrievePostCall<Invoice>(this.urlInvoice, invoiceId.toString().toString()).pipe()
  }


  // array che ricevo dopo subscribe trovando il prodotto con tale id
  arrayRecieved: Object = []
  prodFound: any;

  //array per le quantita' dei prodotti
  qtaArray = []

  //array finale che conterra
  arrayFinale = []

  //variabile per gestire id record finale
  i = 0

  //ANCHOR add prod to cart
  async addProdNQnt(itemId: string, itemQuantity: string) {

    //mostro a console i dati passati al metodo
    console.log("id item: ", itemId) //id prodotto
    console.log("qnt item:", itemQuantity) //quantita' prodotto

    //campi che poi verranno mandati a backend per eseguire calcoli
    this.idItemsString = this.idItemsString + itemId + ";"
    this.qntItemsString = this.qntItemsString + itemQuantity + ";"

    //faccio la subscribe per trovare il prodotto cercato tramite id
    this.getProduct(itemId).subscribe(itemFound => {
      this.prodFound = itemFound
      this.arrayRecieved = this.prodFound
      console.log("item found: " + itemFound)
    })

    await this.delay(500); //creo ritardo per consentire l'aggiunta del prodotto alla tabella di recap

    //l'array finale deve contenere : ID record , PRODOTTO , QUANTITA'
    this.arrayFinale.push({
      idRecord: this.i, //aggiundo idRecord per mappare con value = i
      prod: this.prodFound, //prod e' il record estratto con subsrcibe
      qta: itemQuantity //aggiungo qta per sapere quantita' del prodotto inserito
    })

    //aggiungo 1 a id cosi' da mappare l'array finale
    this.i++

  

    console.log("arrayRecieved: ", this.arrayRecieved)
    console.log("finale--> ", this.arrayFinale)

    //appena inserisco un prodotto e schiacco su + la form si resetta cosi' da permettere altri inserimenti
    this.invoiceInsertProd.reset()

  }

  removeFromCart(i: number) {
    //nell'array finale elimino il record con index = i , passato tramite metodo da html 
    this.arrayFinale.splice(i, 1)
  }

}
