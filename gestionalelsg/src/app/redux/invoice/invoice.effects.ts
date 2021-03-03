
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createInvoice, deleteInvoice, initInvoiceFounds, initInvoices, lookForInvoices, retrieveAllInvoices, retrieveLastInvoice, updateInvoice } from "./invoice.actions";


@Injectable()
export class InvoicesEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }
    
    retreiveAllInvoice(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("invoice/findAll");
    }

    deleteInvoice(idS:string):Observable<Response>{
        return this.http.retrievePostCall("invoice/delete",{idS})
    }
    deleteInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteInvoice),
        switchMap((action) => this.deleteInvoice(
            action.idS).pipe(
            map((response) => initInvoices({ response })),
            tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

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

    createInvoice(custId:string,payCondition:string,docType:string,sale:string,idItemsString:string,qntItemsString: string, iva: string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/create',{custId,payCondition,docType,sale,idItemsString,qntItemsString, iva});
    }
    //idItemsString:string,qntItemsString: string
    createInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createInvoice),
        switchMap((action) => this.createInvoice(
            action.custId,
            action.payCondition,
            action.docType,
            action.sale,
            action.idItemsString,
            action.qntItemsString,
            action.iva).pipe(
            map((response) => initInvoices({ response })),
           tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

    searchInvoices(termine:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/search',{termine});
    }
    
    searchInvoices$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(lookForInvoices),
        switchMap((action) => this.searchInvoices(
            action.termine).pipe(
            map((response) => initInvoiceFounds({ response })),
            tap(()=>this.router.navigate(["/tabbed/invoices/found"], { queryParams: { term: action.termine }}))
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

    updateInvoice(idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, taxable: string, qntItemsString: string, saleImport: string): Observable<Response>{
        return this.http.retrievePostCall<Response>('invoice/update',{idS, custId, payCondition, docType, sale, idItemsString, taxable, qntItemsString, saleImport});
    }
    
    updateInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateInvoice),
        switchMap((action) => this.updateInvoice(
            action.idS,
            action.custId,
            action.payCondition,
            action.docType,
            action.sale,
            action.idItemsString,
            action.taxable,
            action.qntItemsString,
            action.saleImport).pipe(
            map((response) => initInvoices({ response })),
           tap(()=>this.router.navigateByUrl('/redirectinvoices'))
        ))
    ));

}
