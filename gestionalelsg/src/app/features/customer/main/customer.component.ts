import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private store: Store, private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })

  }

  insert(){
    console.log("invio")
    this.customerService.createCustomer(this.customerForm.value.email, this.customerForm.value.name, this.customerForm.value.surname)
  } 
  invio(){
   
  }



}
