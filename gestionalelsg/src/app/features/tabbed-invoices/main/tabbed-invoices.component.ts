import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { selectInvoices } from 'src/app/redux/invoice';
import { selectProducts } from 'src/app/redux/product';
import { CustomerService } from '../../customer/services/customer.service';
import { ProductsService } from '../../products/service/products.service';
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
  cercaForm:FormGroup

  idN:number;
  idS:string;
  codeD:string;
  closeResult='';

  collectionSize:number
  page = 1;
  pageSize = 5;

  public isCollapsed = false;

  constructor(private store: Store,  private router: Router, private productService: ProductsService, private route: Router, private invoicesService: TabbedInvoicesService, private customerService: CustomerService, private fb:FormBuilder, private modalService: NgbModal) {
    this.invoicesService.retrieveAllInvoices()
    this.customerService.retreiveAllCustomers()
    this.productService.retrieveAllProducts()
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

    this.cercaForm=this.fb.group({
      termine: ['', Validators.required]
    })

    this.invoiceInsertForm=this.fb.group({

      custId: ['', Validators.required],
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],
      //articles:['', Validators.required],
    })

    this.invoiceUpdateForm=this.fb.group({
      custId: ['', Validators.required],
      date: ['', Validators.required],
      payCondition:['', Validators.required],
      docType:['', Validators.required],
      sale:['', Validators.required],

     // articles:['', Validators.required],


      taxable:['', Validators.required],
      quantity:['', Validators.required],
      saleImport:['', Validators.required],
      iva:['', Validators.required],
      ivaPrice:['', Validators.required],
      totMerce:['', Validators.required],
      totServices:['', Validators.required]
    })

    this.store.pipe(select(selectInvoices)).subscribe((invoices) => {
      this.collectionSize=invoices.length;
    })

  }

  get invoices(): Observable<Invoice[]>{
    return this.store.pipe(select(selectInvoices))
  }

  get elements(): Observable<Customer[]>{
    return this.store.pipe(select(selectCustomers))
  }

  get products(): Observable<Product[]>{
    return this.store.pipe(select(selectProducts))
  }

  create(){
    this.invoicesService.create(this.invoiceInsertForm.value.custId,
      this.invoiceInsertForm.value.payCondition, this.invoiceInsertForm.value.docType,
      this.invoiceInsertForm.value.sale,this.idItemsString, this.qntItemsString)

  }
  deleteInv(){
    this.invoicesService.deleteInvoice(this.idS)
  }

  update(){
    
    console.log("id customer che mi fa piangere: ", this.invoiceUpdateForm.value.custId )
    this.invoicesService.updateInvoice(this.idS.toString(),
                                       this.invoiceUpdateForm.value.custId, 
                                       this.invoiceUpdateForm.value.payCondition, 
                                       this.invoiceUpdateForm.value.docType, 
                                       this.invoiceUpdateForm.value.sale, 
                                       this.idItemsString, 
                                       this.invoiceUpdateForm.value.taxable,
                                       this.qntItemsString, 
                                       this.invoiceUpdateForm.value.saleImport)
  }

  search(){
    console.log("cerco")
    this.router.navigate(["/tabbed/invoices/found"], { queryParams: { term: this.cercaForm.value.termine }})
    
  }

  idItems=[];
  qntItems=[];

  idItemsString:string=""
  qntItemsString:string=""


  addProdNQnt(itemId:string, itemQuantity:string){
    console.log("id items: ",itemId)
    console.log("qnt items:", itemQuantity)

    this.idItemsString=this.idItemsString+itemId+";"
    this.qntItemsString=this.qntItemsString+itemQuantity+";"

   this.idItems.push(itemId);
   this.qntItems.push(itemQuantity)

   console.log("id items: ",this.idItems)
   console.log("qnt items:", this.qntItems)
  }

  
}
