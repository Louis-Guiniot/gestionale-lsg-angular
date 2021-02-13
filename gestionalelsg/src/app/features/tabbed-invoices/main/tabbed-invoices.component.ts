import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { CustomerService } from '../../customer/services/customer.service';
import { TabbedInvoicesService } from '../services/tabbed-invoices.service';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-tabbed-invoices',
  templateUrl: './tabbed-invoices.component.html',
  styleUrls: ['./tabbed-invoices.component.scss']
})


export class TabbedInvoicesComponent implements OnInit{
  asyncTabs: Observable<ExampleTab[]>;

  model: NgbDateStruct;
  placement = 'left';

  invoiceInsertForm:FormGroup
  invoiceUpdateForm:FormGroup

  idN:number;
  idS:string;
  codeD:string;
  closeResult='';

  public isCollapsed = false;

  constructor(private store: Store, private route: Router, private invoicesService: TabbedInvoicesService, private customerService: CustomerService, private fb:FormBuilder, private modalService: NgbModal) {
    this.invoicesService.retrieveAllInvoices()
    this.customerService.retreiveAllCustomers()
  }

  openXL(content,idCust?:string,name?:string) {

    this.modalService.open(content, { size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.invoiceInsertForm.reset();
      this.invoiceUpdateForm.reset();
    });;

    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.codeD=name;


    console.log("idN: "+this.idN+"codeD: "+this.codeD)
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

  ngOnInit(): void{

    this.invoiceInsertForm=this.fb.group({

      custId: ['', Validators.required],
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],
      articles:['', Validators.required],
    })

    this.invoiceUpdateForm=this.fb.group({
      idCliente: ['', Validators.required],
      date: ['', Validators.required],
      condizioniPagamento:['', Validators.required],
      tipoDocumento:['', Validators.required],
      sconto:['', Validators.required],
      articoli:['', Validators.required],
      taxable:['', Validators.required],
      quantity:['', Validators.required],
      saleImport:['', Validators.required],
      iva:['', Validators.required],
      ivaPrice:['', Validators.required],
      totMerce:['', Validators.required],
      totServices:['', Validators.required]
    })

  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }

  get elements(): Observable<Customer[]>{
    return this.store.pipe(select(selectCustomers))
  }

  create(){
    this.invoicesService.create(this.invoiceInsertForm.value.custId,
      this.invoiceInsertForm.value.payCondition, this.invoiceInsertForm.value.docType,
      this.invoiceInsertForm.value.sale,this.invoiceInsertForm.value.articles)

  }
  deleteInv(){
    this.invoicesService.deleteInvoice(this.idS)
  }

  update(){
    console.log("LA FORM DI LOUIS FA CAGARE E INFATTI: "+this.idS.toString(), this.invoiceUpdateForm.value.idCliente, this.invoiceUpdateForm.value.date, this.invoiceUpdateForm.value.condizioniPagamento, 
    this.invoiceUpdateForm.value.tipoDocumento, this.invoiceUpdateForm.value.sconto, this.invoiceUpdateForm.value.articoli, this.invoiceUpdateForm.value.taxable,
    this.invoiceUpdateForm.value.quantity, this.invoiceUpdateForm.value.saleImport)


    this.invoicesService.updateInvoice(this.idS.toString(),
                                       this.invoiceUpdateForm.value.idCliente, 
                                       this.invoiceUpdateForm.value.date,
                                       this.invoiceUpdateForm.value.condizioniPagamento, 
                                       this.invoiceUpdateForm.value.tipoDocumento, 
                                       this.invoiceUpdateForm.value.sconto, 
                                       this.invoiceUpdateForm.value.articoli, 
                                       this.invoiceUpdateForm.value.taxable,
                                       this.invoiceUpdateForm.value.quantity, 
                                       this.invoiceUpdateForm.value.saleImport)
  }
}
