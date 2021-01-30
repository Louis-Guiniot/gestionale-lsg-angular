import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MeasureUnit } from 'src/app/core/model/MeasureUnit.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { selectMeasures, selectMeasureState } from 'src/app/redux/measure';
import { selectProducts } from 'src/app/redux/product';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products =[];
  units=[];
  createProductForm: FormGroup;
  
  constructor(private pruductService: ProductsService, private store: Store, private route: Router, private fb:FormBuilder) {
    this.pruductService.retrieveAllProducts();
    this.pruductService.retrieveAllMeasures();
   }

  ngOnInit(): void {
   
    this.createProductForm=this.fb.group({
      codeProduct: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required]
    })


   

    // this.store.pipe(select(selectProducts)).subscribe((products) => {
    //   for (let prod of products) {
    //     this.products.push(prod);
    //     console.log(prod);
    //   }
    //   return this.products
    // })
    // this.store.pipe(select(selectMeasures)).subscribe((measures) => {
    //   for (let measure of measures) {
    //     this.units.push(measure);
    //     console.log(measure);
    //   }
    //   return this.units
    // })
    
  }

  get prods(): Observable<Product[]> {
    return this.store.pipe(select(selectProducts));
  }

  get measures(): Observable<MeasureUnit[]> {
    return this.store.pipe(select(selectMeasures));
  }

   delay() {
    return new Promise( resolve => setTimeout(resolve, 1000) );
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
  ngOnDestroy() {
    
  }

}
