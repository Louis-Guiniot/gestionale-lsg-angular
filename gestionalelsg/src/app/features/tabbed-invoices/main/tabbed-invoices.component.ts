import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { selectInvoices } from 'src/app/redux/invoice';
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


  invoiceInsertForm:FormGroup
  invoiceUpdateForm:FormGroup

  idN:number;
  idS:string;
  codeD:string;
  closeResult='';

  constructor(private store: Store, private route: Router, private invoicesService: TabbedInvoicesService, private fb:FormBuilder, private modalService: NgbModal) {
    this.invoicesService.retrieveAllInvoices()
  }

  open(content,idCust?:string,name?:string) {
    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.codeD=name;


    console.log("idN: "+this.idN+"codeD: "+this.codeD)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  ngOnInit():void{

    this.invoiceInsertForm=this.fb.group({
     
      custId: ['', Validators.required],
      date: ['', Validators.required],
      code:['', Validators.required],
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],
      articles:['', Validators.required],
      taxable:['', Validators.required],
      quantity:['', Validators.required],
      saleImport:['', Validators.required],
      iva:['', Validators.required],
      totMerce:['', Validators.required],
      totServices:['', Validators.required]
    })

    this.invoiceUpdateForm=this.fb.group({
     
      custId: ['', Validators.required],
      date: ['', Validators.required],
      code:['', Validators.required],
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],
      articles:['', Validators.required],
      taxable:['', Validators.required],
      quantity:['', Validators.required],
      saleImport:['', Validators.required],
      iva:['', Validators.required],
      totMerce:['', Validators.required],
      totServices:['', Validators.required]
    })

  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }

  create(){
    this.invoicesService.create(this.invoiceInsertForm.value.custId,this.invoiceInsertForm.value.date,
      this.invoiceInsertForm.value.payCondition, this.invoiceInsertForm.value.docType,
      this.invoiceInsertForm.value.sale,this.invoiceInsertForm.value.articles,this.invoiceInsertForm.value.taxable)
    
  }
  deleteInv(id:string){
    this.invoicesService.deleteInvoice(id)
  }
}
