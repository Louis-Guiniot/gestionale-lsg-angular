import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { createCustomer, deleteCustomer, initCustomers, retreiveAllCustomers, updateCustomer } from "./customer.actions";
import { Response } from '../../core/model/Response.interface';
import { Action } from "@ngrx/store";

@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllCustomers(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("customer/findAll");
    }

    
    createCustomer(email:string, ragioneSociale:string, partitaIva:string,sede:string,residenza:string,name:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('customer/create',{email,ragioneSociale,partitaIva,sede,residenza,name});
    }

    findUpdateCustomer(id:string, ragioneSociale:string, partitaIva:string, email:string, sede: string, residenza: string, name:string){
        return this.http.retrievePostCall<Response>('customer/update',{id, ragioneSociale, partitaIva,email,sede,residenza,name});
    }

    deleteCustomer(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('customer/delete',{id}));
        return this.http.retrievePostCall<Response>('customer/delete',{id});
    }
    //id:string, ragioneSociale:string, partitaIva:string, email:string, sede: string, residenza: string, name:string
    findUpdateCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateCustomer),
        switchMap((action) => this.findUpdateCustomer(
            action.id,
            action.ragioneSociale,
            action.partitaIva,
            action.email,
            action.sede,
            action.residenza,
            action.name).pipe(
            map((response) => initCustomers({ response }))
            ,tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));

    deleteCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteCustomer),
        switchMap((action) => this.deleteCustomer(
            action.id).pipe(
            map((response) => initCustomers({ response }))
            ,tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));

    getAllCustomers$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllCustomers),
        switchMap(() => this.retreiveAllCustomers().pipe(
            map((response) => initCustomers({ response }))
        ))
    ));

    createCustomer$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createCustomer),
        switchMap((action) => this.createCustomer(
            action.email,
            action.ragioneSociale,
            action.partitaIva,
            action.sede,
            action.residenza,
            action.name).pipe(
            map((response) => initCustomers({ response }))
            ,tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));
}