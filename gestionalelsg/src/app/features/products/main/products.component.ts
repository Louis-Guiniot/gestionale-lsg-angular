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
  cercaForm: FormGroup;

  idN:number;
  idS:string;
  nameD:string;

  collectionSize:number
  page = 1;
  pageSize = 2;

  term='null'
  
  constructor(private productService: ProductsService, private store: Store, private router: Router, private fb:FormBuilder, private modalService: NgbModal) {
    
    this.productService.retrieveAllProducts();
    this.productService.retrieveAllMeasures();
  }

  open(content,idCust?:string,name?:string) {
    this.idN=Number.parseInt(idCust)
    this.idS=idCust;
    this.nameD=name;


    console.log("idN: "+this.idN+"nameD: "+this.nameD)
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
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

    // this.store.pipe(select(selectProducts)).subscribe((products) => {
    //   this.collectionSize=products.length;
    // })

    this.cercaForm=this.fb.group({
      termine: ['', Validators.required]
    })

   
    this.createProductForm=this.fb.group({
     
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required],
      iva:['', Validators.required]
    })

    this.updateProductForm=this.fb.group({
     
      name: ['', Validators.required],
      description: ['', Validators.required],
      measureUnit:['', Validators.required],
      price:['', Validators.required],
      sconto:['', Validators.required],
      iva:['', Validators.required],
    })
    
  }

   get prods(): Observable<Product[]> {
     return this.store.pipe(select(selectProducts));
   }

   get measures(): Observable<MeasureUnit[]> {
     return this.store.pipe(select(selectMeasures));
   }

  updateProd(){

    this.productService.updateProduct(this.idS.toString(),this.updateProductForm.value.name, this.updateProductForm.value.description, this.updateProductForm.value.measureUnit, this.updateProductForm.value.price, this.updateProductForm.value.sconto,this.updateProductForm.value.iva)
  }

  create(){
    
    this.productService.createProduct(this.createProductForm.value.description,this.createProductForm.value.measureUnit,this.createProductForm.value.name,this.createProductForm.value.price, this.createProductForm.value.sconto,this.createProductForm.value.iva)
    
  }
  deleteProd(){
    this.productService.deleteProduct(this.idS)
  }

  clear(){
    this.createProductForm.reset();
  }

  searchTerm(){
    this.term = this.cercaForm.value.termine
    console.log("cerco con termine: ",this.term)

    //per evitare errore paginazione
    this.pageSize = 1000;
  }

  resetSearchBar(){
    this.term = 'null';
    this.pageSize = 2 
  }

}


