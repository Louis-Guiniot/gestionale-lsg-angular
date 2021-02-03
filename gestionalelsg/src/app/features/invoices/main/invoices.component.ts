import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoiceForm: FormGroup

  constructor(private store: Store, private route: Router, private invoicesService: InvoicesService, private fb:FormBuilder) { 
    this.invoicesService.retrieveAllInvoices()
  }

  ngOnInit(): void {

    this.invoiceForm=this.fb.group({
      products:['', Validators.required],
      date:['', Validators.required],
      sale:['', Validators.required],
      imponibile:['', Validators.required],
      condizionePagamento:['', Validators.required],
      docType:['', Validators.required],
      idCustomer: ['', Validators.required],
      
    })
  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }
  delete(id:string){
    this.invoicesService.deleteProduct(id)
  }

  clear(){
    this.invoiceForm.reset();
  }
  createInvoice(){
    this.invoicesService.create(
      this.invoiceForm.value.products,
      this.invoiceForm.value.date,
      this.invoiceForm.value.sale,
      this.invoiceForm.value.imponibile,
      this.invoiceForm.value.condizionePagamento,
      this.invoiceForm.value.docType,
      this.invoiceForm.value.idCustomer

      )
  }

}
