
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { createInvoice, initInvoices, initProducts, retrieveAllInvoices, retrieveAllProducts } from "./product.actions";
import { Response } from '../../core/model/Response.interface';
import { Invoice } from "src/app/core/model/Invoice.interface";


@Injectable()
export class ProductsEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllProduct(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("product/findAll");
    }

    //sbagliato metterlo qua ma 2 much sbatti
    createInvoice(prodottiLista: string, totalPrice: string,customerId: string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/create',{prodottiLista, totalPrice,customerId});
    }

    getAllProducts$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllProducts),
        switchMap(() => this.retreiveAllProduct().pipe(
            map((response) => initProducts({ response }))
        ))
    ));



    //è sbagliato ma no sbatti di farne un altro
   
    createInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createInvoice),
        switchMap((action) => this.createInvoice(
            action.prodottiLista,
            action.totalPrice,
            action.customerId).pipe(
            map((response) => initInvoices({ response }))
        ))
    ));
    
    
}
