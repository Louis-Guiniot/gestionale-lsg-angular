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
  idS: string
  codeD: string

  closeResult = ''

  //aggiunta prodotti
  idItems = []
  qntItems = []
  productsArray = []

  idItemsString: string = ""
  qntItemsString: string = ""

  prodCount = 0
  itemQnumber: number

  //accordion
  public isCollapsed = false;

  //paginazione
  collectionSize: number
  page = 1
  pageSize = 2

  //ricerca
  term = 'null'

  constructor(private store: Store, private router: Router, private productService: ProductsService, private route: Router, private invoicesService: TabbedInvoicesService, private ivaService: IvaService, private customerService: CustomerService, private fb: FormBuilder, private modalService: NgbModal) {
    this.invoicesService.retrieveAllInvoices()
    this.customerService.retreiveAllCustomers()
    this.productService.retrieveAllProducts()
    this.invoicesService.retreiveAllPayConditions()
    this.ivaService.retrieveAllIva()
    this.invoicesService.retreiveAllDocumentsType()
  }

  openXL(content, idCust?: string, name?: string) {

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      this.invoiceInsertForm.reset();
      this.invoiceUpdateForm.reset();
      this.invoiceInsertProd.reset();
      this.productsArray.pop();

    });

    this.idN = Number.parseInt(idCust)
    this.idS = idCust;
    this.codeD = name;

    console.log("idN: " + this.idN + "codeD: " + this.codeD)
    console.log("array di prodotti: " + this.productsArray)
  }

  openDeleteModal(content, idInvoice?:string){
    this.modalService.open(content, { size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

    this.idN = Number.parseInt(idInvoice)
    this.idS = idInvoice;

    console.log("idN: " + this.idN)
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
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],
      articles:['', Validators.required],
      taxable:['', Validators.required],
      quantity:['', Validators.required],
      saleImport:['', Validators.required],
      iva:['', Validators.required],
      ivaPrice:['', Validators.required],
      totMerce:['', Validators.required],
      totServices:['', Validators.required],
    })
  }
  
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

  get ivaList(): Observable<Iva[]>{
    return this.store.pipe(select(selectIva))
  }

  get documents(): Observable<DocumentType[]>{
    return this.store.pipe(select(selectDocument))
  }

  create() {
    this.invoicesService.create(this.invoiceInsertForm.value.custId,
      this.invoiceInsertForm.value.payCondition, this.invoiceInsertForm.value.docType,
      this.invoiceInsertForm.value.sale, this.idItemsString, this.qntItemsString, this.invoiceInsertForm.value.iva)

    // productsArray.forEach(prod => {
    //   this.invoicesService.createPhi(prod.id, prod.qta)
    // });
  }

  deleteInv() {
    this.invoicesService.deleteInvoice(this.idS)
  }

  update() {

    console.log("id customer che mi fa piangere: ", this.invoiceUpdateForm.value.custId)
    this.invoicesService.updateInvoice(this.idS.toString(),

                                       this.invoiceUpdateForm.value.custId, 
                                       this.invoiceUpdateForm.value.payCondition, 
                                       this.invoiceUpdateForm.value.docType, 
                                       this.invoiceUpdateForm.value.sale, 
                                       this.idItemsString, 
                                       this.qntItemsString, 
                                       this.invoiceUpdateForm.value.iva
                                       
                                       )}

  // searchTerm(){
  //   console.log("cerco")
  //   this.router.navigate(["/tabbed/invoices/found"], { queryParams: { term: this.cercaForm.value.termine }})
  // }

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

  addProdNQnt(itemId: string, itemQuantity: string) {

    console.log("id items: ", itemId)
    console.log("qnt items:", itemQuantity)

    this.idItemsString = this.idItemsString + itemId + ";"
    this.qntItemsString = this.qntItemsString + itemQuantity + ";"

    //array per prodotti
    this.idItems.push(itemId);
    this.qntItems.push(itemQuantity)

    console.log("id items: ", this.idItems)
    console.log("qnt items:", this.qntItems)

    this.invoiceInsertProd.reset()

    //creo campo per sapere quanti prodotti sono contenuti
    this.itemQnumber = Number.parseInt(itemQuantity)
    this.prodCount += this.itemQnumber
    console.log(this.prodCount)

    this.productsArray.push({ 
      id:itemId,
      qta:itemQuantity
    })

    console.log(this.productsArray)

  }


  removeFromCart(id:string, qta:string){
    this.productsArray.forEach(product => {
      if(product.id === id && product.qta === qta){
        this.productsArray.pop()
      }
    });
  }


  resetCart() {
    while (this.idItems.length > 0 && this.qntItems.length > 0) {
      this.idItems.pop()
      this.qntItems.pop()

      this.prodCount = 0

    }

    this.invoiceInsertProd.reset()

  }

}
