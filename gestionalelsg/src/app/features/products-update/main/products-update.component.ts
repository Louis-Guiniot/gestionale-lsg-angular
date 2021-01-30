import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProducts } from 'src/app/redux/product';
import { ProductsUpdateService } from '../services/products-update.service';

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
  constructor(private route:ActivatedRoute, private fb: FormBuilder, private store: Store, private productUpdateService: ProductsUpdateService) { }

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
    this.productUpdateService.updateProduct(this.id,this.productsUpdateForm.value.description,
                                            this.productsUpdateForm.value.measureUnit,
                                            this.productsUpdateForm.value.name,
                                            this.productsUpdateForm.value.price);
  }

}
