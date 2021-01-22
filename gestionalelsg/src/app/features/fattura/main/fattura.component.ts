import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';

import { FatturaService } from '../services/fattura.service';

@Component({
  selector: 'app-fattura',
  templateUrl: './fattura.component.html',
  styleUrls: ['./fattura.component.scss']
})
export class FatturaComponent implements OnInit {
  elements=[];

  constructor(private store: Store, private fatturaService: FatturaService) { 
    //this.fatturaService.retrieveAllInvoices();
    this.fatturaService.retrieveLastInvoice();
  }

  ngOnInit(): void {

    this.store.pipe(select(selectInvoices)).subscribe((invoice) => { 
      for (let prod of invoice) {
        this.elements.push(prod); 
        console.log(prod);
    }
      return this.elements;
    })
  }

  get invoice(): Observable<Invoice[]> {
    return this.store.pipe(select(selectInvoices));
  }

}