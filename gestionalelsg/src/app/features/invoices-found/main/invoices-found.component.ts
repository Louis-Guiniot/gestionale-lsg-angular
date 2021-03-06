import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { exit } from 'process';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { selectProducts } from 'src/app/redux/product';
import { CustomerService } from '../../customer/services/customer.service';
import { ExampleTab } from '../../tabbed-invoices/main/tabbed-invoices.component';
import { TabbedInvoicesService } from '../../tabbed-invoices/services/tabbed-invoices.service';

import { InvoicesFoundService } from '../services/invoices-found.service';

@Component({
  selector: 'app-invoices-found',
  templateUrl: './invoices-found.component.html',
  styleUrls: ['./invoices-found.component.scss']
})
export class InvoicesFoundComponent implements OnInit {
  
  term: string
  res: boolean

  asyncTabs: Observable<ExampleTab[]>;

  model: NgbDateStruct;
  placement = 'left';

  invoiceInsertForm: FormGroup
  invoiceUpdateForm: FormGroup
  cercaForm: FormGroup

  idN: number;
  idS: string;
  codeD: string;
  closeResult = '';
  
  found: boolean;

  constructor(private store: Store, private invoicesService: TabbedInvoicesService, private customerService: CustomerService, private route: Router, private aRouter: ActivatedRoute, private invoicesFoundService: InvoicesFoundService, private modalService: NgbModal, private fb: FormBuilder) {
    this.invoicesService.retrieveAllInvoices();
    this.customerService.retreiveAllCustomers();
  }

  openXL(content, idCust?: string, name?: string) {

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.invoiceInsertForm.reset();
      this.invoiceUpdateForm.reset();
    });;

    this.idN = Number.parseInt(idCust)
    this.idS = idCust;
    this.codeD = name;


    console.log("idN: " + this.idN + "codeD: " + this.codeD)
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
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

  //this.invoicesFoundService.retrieveFound(this.term);

  ngOnInit(): void {

    this.invoiceInsertForm = this.fb.group({
      custId: ['', Validators.required],
      payCondition: ['', Validators.required],
      docType: ['', Validators.required],
      sale: ['', Validators.required],
      articles: ['', Validators.required],
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

    this.aRouter.queryParams.subscribe(params => {
      this.term = params['term'];
      console.log("termine trovato: ", this.term)

    });
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
      this.invoiceUpdateForm.value.articles,
      this.invoiceUpdateForm.value.taxable,
      this.invoiceUpdateForm.value.quantity,
      this.invoiceUpdateForm.value.saleImport,
      this.invoiceUpdateForm.value.iva)
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
}
