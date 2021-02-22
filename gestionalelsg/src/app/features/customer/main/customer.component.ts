import { Component, OnInit, PipeTransform} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { CustomerService } from '../services/customer.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  collectionSize:number;
  page = 1;
  pageSize = 5;


  filter = new FormControl('');

  constructor(private store: Store, private route: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder, private modalService: NgbModal) {
    console.log(this.customerService.retreiveAllCustomers());
  }

  open(content,idCust?:string,name?:string) {
    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.nameD=name;


    console.log("idN: "+this.idN+"    nameD: "+this.nameD)
    this.modalService.open(content, { size: 'l'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.customerFormUpdate.reset();
      this.customerForm.reset();
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

     this.store.pipe(select(selectCustomers)).subscribe((customers) => {
        this.collectionSize=customers.length;
      })
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

    this.customerService.updateCustomer(this.idS.toString(), this.customerFormUpdate.value.ragioneSociale, this.customerFormUpdate.value.partitaIva,this.customerFormUpdate.value.email, this.customerFormUpdate.value.sede,this.customerFormUpdate.value.residenza,this.customerFormUpdate.value.name )
  }

  clear() {
    this.customerForm.reset();
  }




}
