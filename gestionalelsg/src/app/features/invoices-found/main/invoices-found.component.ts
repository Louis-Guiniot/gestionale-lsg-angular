import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';
import { TabbedInvoicesService } from '../../tabbed-invoices/services/tabbed-invoices.service';

import { InvoicesFoundService } from '../services/invoices-found.service';

@Component({
  selector: 'app-invoices-found',
  templateUrl: './invoices-found.component.html',
  styleUrls: ['./invoices-found.component.scss']
})
export class InvoicesFoundComponent implements OnInit {
  term:string

  constructor(private store: Store,private invoicesService: TabbedInvoicesService, private route: Router, private aRouter: ActivatedRoute,private invoicesFoundService: InvoicesFoundService, private modalService: NgbModal) {
    this.aRouter.queryParams.subscribe(params => {
      this.term = params['term'];
      console.log("termine trovato: ", this.term)
    
  });
  this.invoicesFoundService.retrieveFound(this.term)

  }

  //this.invoicesFoundService.retrieveFound(this.term);

  ngOnInit(): void {
   
  
  }

 

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }

}
