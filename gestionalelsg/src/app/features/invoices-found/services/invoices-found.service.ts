import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteInvoice, lookForInvoices, updateInvoice } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class InvoicesFoundService {

  constructor(private store:Store) { }
}
