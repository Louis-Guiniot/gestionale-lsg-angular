import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Iva } from 'src/app/core/model/Iva.interface';
import { selectIva } from 'src/app/redux/iva';
import { CustomerService } from '../../customer/services/customer.service';
import { ProductsService } from '../../products/service/products.service';
import { TabbedInvoicesService } from '../../tabbed-invoices/services/tabbed-invoices.service';
import { IvaService } from '../service/iva.service';

@Component({
  selector: 'app-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.scss']
})
export class IvaComponent implements OnInit {
  insertIvaForm: FormGroup;

  constructor(private store: Store, private router: Router, private ivaService: IvaService, private route: Router, private invoicesService: TabbedInvoicesService, private customerService: CustomerService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.insertIvaForm = this.fb.group({
      percentualeIva: ['', Validators.required],
      info: ['', Validators.required],
    })
  }

  get ivas(): Observable<Iva[]> {
    return this.store.pipe(select(selectIva))
  }

  insertIva(){
    console.log("inser iva - component")
    this.ivaService.createIva(this.insertIvaForm.value.percentualeIva,
                              this.insertIvaForm.value.info)
  }

}
