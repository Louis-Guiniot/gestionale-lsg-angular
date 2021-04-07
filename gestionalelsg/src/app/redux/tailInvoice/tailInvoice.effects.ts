
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createTailInvoice, deleteTailInvoice, initTailInvoiceFounds, initTailInvoices, lookForTailInvoices, retrieveAllTailInvoices, retrieveLastTailInvoice, updateTailInvoice } from "./tailInvoice.actions";


@Injectable()
export class TailInvoicesEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }
    
    retreiveAllTailInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("invoice/findAllTail");
    }

    deleteTailInvoice(idS:string):Observable<Response>{
        return this.http.retrievePostCall("invoice/delete",{idS})
    }
    deleteTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteTailInvoice),
        switchMap((action) => this.deleteTailInvoice(
            action.idS).pipe(
            map((response) => initTailInvoices({ response })),
            tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

    retreiveLastTailInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        //console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("invoice/findLast");
    }


    getAllTailInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllTailInvoices),
        switchMap(() => this.retreiveAllTailInvoice().pipe(
            map((response) => initTailInvoices({ response }))
        ))
    ));


    getLastTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveLastTailInvoice),
        switchMap(() => this.retreiveLastTailInvoice().pipe(
            map((response) => initTailInvoices({ response }))
        ))
    ));    

    createTailInvoice(custId:string,payCondition:string,docType:string,sale:string,idItemsString:string,qntItemsString: string, iva: string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/create',{custId,payCondition,docType,sale,idItemsString,qntItemsString, iva});
    }
    //idItemsString:string,qntItemsString: string
    createTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createTailInvoice),
        switchMap((action) => this.createTailInvoice(
            action.custId,
            action.payCondition,
            action.docType,
            action.sale,
            action.idItemsString,
            action.qntItemsString,
            action.iva).pipe(
            map((response) => initTailInvoices({ response })),
           tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

    searchTailInvoices(termine:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/search',{termine});
    }
    
    searchTailInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(lookForTailInvoices),
        switchMap((action) => this.searchTailInvoices(
            action.termine).pipe(
            map((response) => initTailInvoiceFounds({ response })),
            tap(()=>this.router.navigate(["/tabbed/invoices/found"], { queryParams: { term: action.termine }}))
        ))
    ));


    // getAllTailInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllTailInvoices),
    //     switchMap(() => this.retreiveAllinvoices().pipe(
    //         map((response) => initProducts({ response }))
    //     ))
    // ));


    // getLastTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retrieveAllTailInvoices),
    //     switchMap(() => this.retreiveLastTailInvoice().pipe(
    //         map((response) => initTailInvoices({ response }))
    //     ))
    // ));        

    // //è sbagliato ma no sbatti di farne un altro
   
    // createTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(createTailInvoice),
    //     switchMap((action) => this.createTailInvoice(
    //         action.prodottiLista,
    //         action.totalPrice,
    //         action.customerId,
    //         action.sconto).pipe(
    //         map((response) => initTailInvoices({ response })),
    //         tap(()=>this.router.navigateByUrl('/fattura'))
    //     ))
    // ));

    updateTailInvoice(idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, qntItemsString: string, iva: string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/update',{idS, custId, payCondition, docType, sale, idItemsString, qntItemsString, iva});
    }
    
    updateTailInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateTailInvoice),
        switchMap((action) => this.updateTailInvoice(
            action.idS,
            action.custId,
            action.payCondition,
            action.docType,
            action.sale,
            action.idItemsString,
            action.qntItemsString,
            action.iva).pipe(
            map((response) => initTailInvoices({ response })),
           tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

}
