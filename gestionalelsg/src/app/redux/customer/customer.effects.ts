import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { createCustomer, initCustomers, retreiveAllCustomers } from "./customer.actions";
import { Response } from '../../core/model/Response.interface';
import { Action } from "@ngrx/store";

@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllCustomers(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("customer/findAll");
    }

    //sbagliato metterlo qua ma 2 much sbatti
    createCustomer(email: string, name: string, surname:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('customer/create',{email,name,surname});
    }

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
            action.name,
            action.surname).pipe(
            map((response) => initCustomers({ response })),
            tap(()=>this.router.navigateByUrl('/customer'))
        ))
    ));
}