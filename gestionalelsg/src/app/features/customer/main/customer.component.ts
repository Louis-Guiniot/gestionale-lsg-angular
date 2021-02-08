import { Component, OnInit, PipeTransform} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { CustomerService } from '../services/customer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';


function search(text: string, pipe: PipeTransform): Customer[] {
  return this.customers.filter(() => {
    const term = text.toLowerCase();
    return this.customers.name.toLowerCase().includes(term)
        || pipe.transform(this.customers.email).includes(term)
        || pipe.transform(this.customers.surname).includes(term);
  });
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  closeResult = '';
  customerForm: FormGroup;
  customerFormUpdate: FormGroup;
  

  nameD:string;
  customers=[];
  id:string
  idN:number
  idS:string

  page = 1;
  pageSize = 4;
  collectionSize:number;

  filter = new FormControl('');

  constructor(pipe: DecimalPipe,private store: Store, private route: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder, private modalService: NgbModal) {
    console.log(this.customerService.retreiveAllCustomers());
    this.refreshCountries(); 
  }

  refreshCountries() {
    this.customers
      .map((customer, i) => ({id: i + 1, ...customer}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(content,idCust?:string,name?:string) {
    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.nameD=name;


    console.log("idN: "+this.idN+"nameD: "+this.nameD)
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

  ngOnInit(): void {

    this.store.pipe(select(selectCustomers)).subscribe((customers) => {
      for (let cust of customers) {
        this.customers.push(cust);
      }
      this.collectionSize=this.customers.length;
      return this.customers
    })

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.customerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      ragioneSociale: ['', Validators.required],
      residenza: ['', Validators.required],
      sede: ['', Validators.required],
      partitaIva: ['', Validators.required]
    })

    this.customerFormUpdate = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      ragioneSociale: ['', Validators.required],
      residenza: ['', Validators.required],
      sede: ['', Validators.required],
      partitaIva: ['', Validators.required]
    })

    //   this.store.pipe(select(selectCustomers)).subscribe((customers) => {
    //   for (let cust of customers) {
    //     this.elements.push(cust);
    //     console.log(cust);
    //   }
    //   return this.elements
    // })
  }
  get elements(): Observable<Customer[]> {
    return this.store.pipe(select(selectCustomers));
  }

  insert() {
    console.log("email: " + this.customerForm.value.email)
    console.log("nome: " + this.customerForm.value.name)
    console.log("cognome: " + this.customerForm.value.surname)
    this.customerService.createCustomer(this.customerForm.value.email,  this.customerForm.value.ragioneSociale, this.customerForm.value.partitaIva, this.customerForm.value.sede , this.customerForm.value.residenza, this.customerForm.value.name)
  }

  deleteCust() {
    this.customerService.deleteCustomer(this.idS)
  }

  updateCust(){
    console.log("id "+this.idN)
    console.log("name "+this.customerFormUpdate.value.name)
    console.log("surname "+this.customerFormUpdate.value.surname)
    console.log("email "+this.customerFormUpdate.value.email)

    this.customerService.updateCustomer(this.idS.toString(), this.customerFormUpdate.value.name,this.customerFormUpdate.value.surname, this.customerFormUpdate.value.email)
  }

  // update(id: string) {
  //   console.log(id)
  //   this.route.navigate(["customer/update"], {
  //     queryParams: {
  //       id: id
  //     },
  //     queryParamsHandling: 'merge',
  //   });
  // }

  clear() {
    this.customerForm.reset();
  }




}
