
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';

import { createTipoDocumento, deleteTipoDocumento, initTipoDocumentoFounds, initTipoDocumento, lookForTipoDocumento, retrieveAllTipoDocumento, retrieveLastTipoDocumento, updateTipoDocumento } from "./tipoDocumento.actions";


@Injectable()
export class TipoDocumentoEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }
    
    retreiveAllTipoDocumento(): Observable<Response> {
        console.log("chiamata effettuata")
        return this.http.retrieveGetCall<Response>("tipoDocumento/findAll");
    }

    deleteTipoDocumento(idS:string):Observable<Response>{
        return this.http.retrievePostCall("tipoDocumento/delete",{idS})
    }
    deleteTipoDocumento$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteTipoDocumento),
        switchMap((action) => this.deleteTipoDocumento(
            action.idS).pipe(
            map((response) => initTipoDocumento({ response })),
            tap(()=>this.router.navigateByUrl('/redirecttipoDocumento'))
        ))
    ));

    retreiveLastTipoDocumento(): Observable<Response> {
        console.log("chiamata effettuata")
        //console.log(this.http.retrieveGetCall<Response>("invoice/findLast"))
        return this.http.retrieveGetCall<Response>("tipoDocumento/findLast");
    }


    getAllTipoDocumento$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllTipoDocumento),
        switchMap(() => this.retreiveAllTipoDocumento().pipe(
            map((response) => initTipoDocumento({ response }))
        ))
    ));


    getLastTipoDocumento$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveLastTipoDocumento),
        switchMap(() => this.retreiveLastTipoDocumento().pipe(
            map((response) => initTipoDocumento({ response }))
        ))
    ));    

    createTipoDocumento(tipo:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('tipoDocumento/create',{tipo});
    }
    //idItemsString:string,qntItemsString: string
    createTipoDocumento$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createTipoDocumento),
        switchMap((action) => this.createTipoDocumento(
            action.tipo).pipe(
            map((response) => initTipoDocumento({ response })),
           tap(()=>this.router.navigateByUrl('/redirecttipoDocumento'))
        ))
    ));

    searchTipoDocumento(termine:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('tipoDocumento/search',{termine});
    }
    
    searchTipoDocumento$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(lookForTipoDocumento),
        switchMap((action) => this.searchTipoDocumento(
            action.termine).pipe(
            map((response) => initTipoDocumentoFounds({ response })),
            tap(()=>this.router.navigate(["/tabbed/tipoDocumento/found"], { queryParams: { term: action.termine }}))
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

    // updateInvoice(idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, taxable: string, qntItemsString: string, saleImport: string): Observable<Response>{
    //     return this.http.retrievePostCall<Response>('invoice/update',{idS, custId, payCondition, docType, sale, idItemsString, taxable, qntItemsString, saleImport});
    // }
    
    // updateInvoice$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(updateInvoice),
    //     switchMap((action) => this.updateInvoice(
    //         action.idS,
    //         action.custId,
    //         action.payCondition,
    //         action.docType,
    //         action.sale,
    //         action.idItemsString,
    //         action.taxable,
    //         action.qntItemsString,
    //         action.saleImport).pipe(
    //         map((response) => initInvoices({ response })),
    //        tap(()=>this.router.navigateByUrl('/redirectinvoices'))
    //     ))
    // ));

}
