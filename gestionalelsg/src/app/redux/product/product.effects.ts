
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import {createProduct, deleteProduct, initProducts, retrieveAllProducts, updateProduct } from "./product.actions";
import { Response } from '../../core/model/Response.interface';
import { Invoice } from "src/app/core/model/Invoice.interface";


@Injectable()
export class ProductsEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllProduct(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("product/findAll");
    }

    retreiveAllinvoices(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("invoice/findAll");
    }

    findUpdateProduct(id:string, description:string, measureUnit:string,name:string,price:string,sconto:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('product/update',{id,description,measureUnit,name,price,sconto});
    }

    deleteProduct(id:string){
        return this.http.retrievePostCall<Response>('product/delete',{id});
    }
    deleteProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteProduct),
        switchMap((action) => this.deleteProduct(
            action.id).pipe(
            map((response) => initProducts({ response })),
            tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));
   

    retreiveLastInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("invoice/findLast");
    }

    createProduct( description:string, measureUnit:string, name:string, price:string, scontoProd:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('product/create',{description, measureUnit,name, price,scontoProd});
    }

    //sbagliato metterlo qua ma 2 much sbatti
    createInvoice(prodottiLista: string, totalPrice: string,customerId: string, sconto:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/create',{prodottiLista, totalPrice,customerId,sconto});
    }

    getAllProducts$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllProducts),
        switchMap(() => this.retreiveAllProduct().pipe(
            map((response) => initProducts({ response }))
        ))
    ));
       

    //è sbagliato ma no sbatti di farne un altro
   
    createProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createProduct),
        switchMap((action) => this.createProduct(
            action.description,
            action.measureUnit,
            action.name,
            action.price,
            action.sconto).pipe(
            map((response) => initProducts({ response })),
            tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));

   
    delay() {
        return new Promise( resolve => setTimeout(resolve, 1000) );
    }
  

    findUpdateProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateProduct),
        switchMap((action) => this.findUpdateProduct(
            action.id,
            action.description,
            action.measureUnit,
            action.name,
            action.price,
            action.scontoProd).pipe(
            map((response) => initProducts({ response }))
            ,tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));
    
    
}
