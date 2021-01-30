import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/core/model/Customer.interface';
import { selectCustomers } from 'src/app/redux/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  //elements = [];
  customerForm: FormGroup;

  constructor(private store: Store, private route: Router, private customerService: CustomerService, private fb: FormBuilder) {
    console.log(this.customerService.retreiveAllCustomers());
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
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

  insert(){
    console.log("email: "+this.customerForm.value.email)
    console.log("nome: "+this.customerForm.value.name)
    console.log("cognome: "+this.customerForm.value.surname)
    this.customerService.createCustomer(this.customerForm.value.email, this.customerForm.value.name, this.customerForm.value.surname)
  } 
  delete(id: string){
   this.customerService.deleteCustomer(id)
  }
  update(id:string){
    console.log(id)
    this.route.navigate(["customer/update"], {
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
    });
  }
  
 


}
