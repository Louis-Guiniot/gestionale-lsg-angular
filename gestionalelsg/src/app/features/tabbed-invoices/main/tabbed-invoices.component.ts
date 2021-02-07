import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';
import { InvoicesService } from '../../invoices/services/invoices.service';


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

  constructor(private store: Store, private route: Router, private invoicesService: InvoicesService, private fb:FormBuilder) {
    this.invoicesService.retrieveAllInvoices()
   }
  ngOnInit():void{

  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }
}
