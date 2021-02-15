import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';
import { CustomerService } from '../../customer/services/customer.service';
import { TabbedInvoicesService } from '../../tabbed-invoices/services/tabbed-invoices.service';

@Component({
  selector: 'app-invoices-found',
  templateUrl: './invoices-found.component.html',
  styleUrls: ['./invoices-found.component.scss']
})
export class InvoicesFoundComponent implements OnInit {
  term:any

  constructor(private store: Store, private route: Router, private aRouter: ActivatedRoute,private invoicesService: TabbedInvoicesService, private modalService: NgbModal) {
    this.invoicesService.retrieveAllInvoices()

  }


  ngOnInit(): void {
    this.aRouter.queryParams.subscribe(params => {
      this.term = params['term'];
      
  });
    console.log("termine trovato: ", this.term)
  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }

}
