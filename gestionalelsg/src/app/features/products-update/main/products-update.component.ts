import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss']
})
export class ProductsUpdateComponent implements OnInit {

  id:string
  idN:number
  productsUpdateForm : FormGroup
  elements=[];
  constructor(private route:ActivatedRoute, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(selectProducts)).subscribe((products) => {
      for (let prod of products) {
        this.elements.push(prod);
      }
      return this.elements
    })
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.productsUpdateForm=this.fb.group({
      codeProduct: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required]
    })

    console.log("l'id dell url: "+this.id)
    this.idN=Number.parseInt(this.id)
    console.log("idN: "+this.idN)
  
  }
  update(){

  }

}
