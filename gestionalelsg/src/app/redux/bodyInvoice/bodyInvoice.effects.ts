
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createBodyInvoice, deleteBodyInvoice, initBodyInvoiceFounds, initBodyInvoices, lookForBodyInvoices, retrieveAllBodyInvoices, retrieveLastBodyInvoice, updateBodyInvoice } from "./bodyInvoice.actions";


@Injectable()
export class BodyInvoicesEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }
    
    retreiveAllBodyInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("invoice/findAllBody");
    }

    deleteBodyInvoice(idS:string):Observable<Response>{
        return this.http.retrievePostCall("bodyInvoice/delete",{idS})
    }
    deleteBodyInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteBodyInvoice),
        switchMap((action) => this.deleteBodyInvoice(
            action.idS).pipe(
            map((response) => initBodyInvoices({ response })),
            tap(()=>this.router.navigateByUrl('/redirectbodyInvoices'))
        ))
    ));

    retreiveLastBodyInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        //console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("invoice/findLast");
    }


    //getAllBodyInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //    ofType(retrieveAllBodyInvoices),
    //    switchMap(() => this.retreiveAllBodyInvoice().pipe(
    //        map((response) => initBodyInvoices({ response }))
    //    ))
    //));


    //getLastBodyInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //    ofType(retrieveLastBodyInvoice),
    //    switchMap(() => this.retreiveLastBodyInvoice().pipe(
    //        map((response) => initBodyInvoices({ response }))
    //    ))
    //));    




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
