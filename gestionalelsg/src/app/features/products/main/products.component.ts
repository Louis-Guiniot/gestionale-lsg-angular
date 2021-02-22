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
import { CartService } from '../../cart/services/cart.service';
import { CartComponent } from '../../cart/main/cart.component';

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

  collectionSize:number;
  page = 1;
  pageSize = 5;
  
  constructor(private productService: ProductsService, private cartService: CartService,private store: Store, private route: Router, private fb:FormBuilder, private modalService: NgbModal) {
    
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
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required],
      note:['', Validators.required]
    })

    this.updateProductForm=this.fb.group({
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required],
      note:['', Validators.required]
    })

       this.store.pipe(select(selectProducts)).subscribe((products) => {
        this.collectionSize = products.length
      })

     
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
    console.log("price "+this.updateProductForm.value.price)
    console.log("measure "+this.updateProductForm.value.measureUnit)
    console.log("note "+this.updateProductForm.value.note)
    console.log("descr "+this.updateProductForm.value.description)


    this.productService.updateProduct(this.idS.toString(),this.updateProductForm.value.note, this.updateProductForm.value.description, this.updateProductForm.value.measureUnit, this.updateProductForm.value.price, this.updateProductForm.value.sconto)
  }

  create(){
    
    this.productService.createProduct(this.createProductForm.value.description,this.createProductForm.value.measureUnit,this.createProductForm.value.note,this.createProductForm.value.price, this.createProductForm.value.sconto)
    
  }
  deleteProd(){
    this.productService.deleteProduct(this.idS)
  }

  clear(){
    this.createProductForm.reset();
  }

   addProd(){
     console.log(this.idS+" aggiunto")
     this.cartService.addInto(this.idS);
   }
  

}
