
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createInvoice, initInvoices, retrieveAllInvoices, retrieveLastInvoice } from "./invoice.actions";


@Injectable()
export class InvoicesEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("invoice/findAll");
    }

    retreiveLastInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        //console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("invoice/findLast");
    }


    getAllInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllInvoices),
        switchMap(() => this.retreiveAllInvoice().pipe(
            map((response) => initInvoices({ response }))
        ))
    ));


    getLastInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveLastInvoice),
        switchMap(() => this.retreiveLastInvoice().pipe(
            map((response) => initInvoices({ response }))
        ))
    ));        


    // getAllInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllInvoices),
    //     switchMap(() => this.retreiveAllinvoices().pipe(
    //         map((response) => initProducts({ response }))
    //     ))
    // ));


    // getLastInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllInvoices),
    //     switchMap(() => this.retreiveLastInvoice().pipe(
    //         map((response) => initInvoices({ response }))
    //     ))
    // ));        

    // //è sbagliato ma no sbatti di farne un altro
   
    // createProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(createProduct),
    //     switchMap((action) => this.createProduct(
    //         action.codeProduct,
    //         action.description,
    //         action.measureUnit,
    //         action.name,
    //         action.price).pipe(
    //         map((response) => initInvoices({ response })),
    //         tap(()=>this.router.navigateByUrl('/home'))
    //     ))
    // ));

    // createInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(createInvoice),
    //     switchMap((action) => this.createInvoice(
    //         action.prodottiLista,
    //         action.totalPrice,
    //         action.customerId,
    //         action.sconto).pipe(
    //         map((response) => initInvoices({ response })),
    //         tap(()=>this.router.navigateByUrl('/fattura'))
    //     ))
    // ));

    
    
    
}
