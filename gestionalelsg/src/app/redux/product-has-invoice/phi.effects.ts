import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { Response } from '../../core/model/Response.interface';
import { Action } from "@ngrx/store";
import { createPhi, deletePhi, initPhi, retrieveAllPhi, updatePhi } from "./phi.actions";

@Injectable()
export class PhiEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllPhi(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("producthasinvoice/findAll");
    }

    
    createPhi(idProduct: string,qtaProduct:string): Observable<Response>{
        console.log("creazione phi - effects")
        return this.http.retrievePostCall<Response>('producthasinvoice/create',{idProduct,qtaProduct});
    }

    findUpdatePhi(idInvoice:string,idProduct: string,qtaProduct:string){
        return this.http.retrievePostCall<Response>('producthasinvoice/update',{idInvoice,idProduct,qtaProduct});
    }

    deletePhi(idProduct: string,qtaProduct:string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('producthasinvoice/delete',{idProduct,qtaProduct}));
        return this.http.retrievePostCall<Response>('producthasinvoice/delete',{idProduct,qtaProduct});
    }

    findUpdatePhi$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updatePhi),
        switchMap((action) => this.findUpdatePhi(
            action.idInvoice,
            action.idProduct,
            action.qtaProduct).pipe(
            map((response) => initPhi({ response }))

        ))
    ));

    deletePhi$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deletePhi),
        switchMap((action) => this.deletePhi(
            action.idProduct,
            action.qtaProduct).pipe(
            map((response) => initPhi({ response }))

        ))
    ));

    getAllPhi$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllPhi),
        switchMap(() => this.retreiveAllPhi().pipe(
            map((response) => initPhi({ response }))
        ))
    ));

    createPhi$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createPhi),
        switchMap((action) => this.createPhi(
            action.idProduct,
            action.qtaProduct).pipe(
            map((response) => initPhi({ response }))
        ))
    ));
}