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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  closeResult = '';
  products =[];
  units=[];

  createProductForm: FormGroup;
  updateProductForm: FormGroup;

  idN:number;
  idS:string;
  nameD:string;
  
  constructor(private productService: ProductsService, private store: Store, private route: Router, private fb:FormBuilder, private modalService: NgbModal) {
    
    this.productService.retrieveAllProducts();
    this.productService.retrieveAllMeasures();
  }

  open(content,idCust?:string,name?:string) {
    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.nameD=name;


    console.log("idN: "+this.idN+"nameD: "+this.nameD)
    this.modalService.open(content, { size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.updateProductForm.reset();
      this.createProductForm.reset();
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
   
    this.createProductForm=this.fb.group({
     
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required]
    })

    this.updateProductForm=this.fb.group({
     
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required]
    })

    //   this.store.pipe(select(selectProducts)).subscribe((products) => {
    //     for (let prod of products) {
    //      this.products.push(prod);
    //       console.log(prod);
    //     }
    //   return this.products
    //  })

     
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

  updateProd(){

    console.log("id "+this.idN)
    console.log("name "+this.updateProductForm.value.name)
    console.log("surname "+this.updateProductForm.value.surname)
    console.log("email "+this.updateProductForm.value.email)

    this.productService.updateProduct(this.idS.toString(),this.updateProductForm.value.name, this.updateProductForm.value.description, this.updateProductForm.value.measureUnit, this.updateProductForm.value.price, this.updateProductForm.value.sconto)
  }

  create(){
    
    this.productService.createProduct(this.createProductForm.value.description,this.createProductForm.value.measureUnit,this.createProductForm.value.name,this.createProductForm.value.price, this.createProductForm.value.sconto)
    
  }
  deleteProd(){
    this.productService.deleteProduct(this.idS)
  }

  clear(){
    this.createProductForm.reset();
  }
  

}
