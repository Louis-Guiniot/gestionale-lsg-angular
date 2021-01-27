import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectCustomers } from 'src/app/redux/customer';

import { CustomerService } from '../../customer/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {
 
  id:string
  customerUpdateForm:FormGroup;
  idN:number
  elements=[];
  constructor(private store: Store, private route: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder) {
    //console.log(this.customerService.retreiveAllCustomers());
   }

  ngOnInit(): void {
    
   
    this.store.pipe(select(selectCustomers)).subscribe((customers) => {
      for (let cust of customers) {
        this.elements.push(cust);
      }
      return this.elements
    })
   
   
    this.customerUpdateForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    })
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    console.log("l'id dell url: "+this.id)
    this.idN=Number.parseInt(this.id)
    console.log("idN: "+this.idN)
  
  }

  update(){
    console.log("id "+this.id)
    console.log("name "+this.customerUpdateForm.value.name)
    console.log("surname "+this.customerUpdateForm.value.surname)
    console.log("email "+this.customerUpdateForm.value.email)

    this.customerService.updateCustomer(this.id, this.customerUpdateForm.value.name,this.customerUpdateForm.value.surname, this.customerUpdateForm.value.email)
  }

}
