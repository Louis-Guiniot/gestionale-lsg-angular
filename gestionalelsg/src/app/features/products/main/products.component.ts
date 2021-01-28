import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  elements =[];
  createProductForm: FormGroup;
  constructor(private pruductService: ProductsService, private store: Store, private route: Router, private fb:FormBuilder) {
    this.pruductService.retrieveAllProducts();
   }

  ngOnInit(): void {
    this.createProductForm=this.fb.group({
      codeProduct: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required]
    })

    this.store.pipe(select(selectProducts)).subscribe((products) => {
      for (let prod of products) {
        this.elements.push(prod);
        console.log(prod);
      }
      return this.elements
    })
  }

  update(id:string){
    console.log(id)
    this.route.navigate(["products/update"], {
      queryParams: {
        id: id
      },
      queryParamsHandling: 'merge',
    });
  }

  create(){
    console.log("eh volevi frocio")
    this.pruductService.createProduct(this.createProductForm.value.codeProduct,this.createProductForm.value.description,this.createProductForm.value.measureUnit,this.createProductForm.value.name,this.createProductForm.value.price)
    
  }

}
