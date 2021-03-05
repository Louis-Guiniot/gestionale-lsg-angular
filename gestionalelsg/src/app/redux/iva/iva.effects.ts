import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { createIva, deleteIva, initIva, retrieveAllIva, updateIva } from "./iva.actions";
import { Response } from '../../core/model/Response.interface';
import { Action } from "@ngrx/store";

@Injectable()
export class IvaEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllIva(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("iva/findAll");
    }

    
    createIva(percentualeIva: string,info:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('iva/create',{percentualeIva, info});
    }

    findUpdateIva(percentualeIva:string){
        return this.http.retrievePostCall<Response>('iva/update',{percentualeIva});
    }

    deleteIva(idS: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('iva/delete',{idS}));
        return this.http.retrievePostCall<Response>('iva/delete',{idS});
    }
    //id:string, ragioneSociale:string, partitaIva:string, email:string, sede: string, residenza: string, name:string
    findUpdateIva$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateIva),
        switchMap((action) => this.findUpdateIva(
            action.percentualeIva).pipe(
            map((response) => initIva({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectiva'))
        ))
    ));

    deleteIva$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteIva),
        switchMap((action) => this.deleteIva(
            action.idS).pipe(
            map((response) => initIva({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectiva'))
        ))
    ));

    getAllIva$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllIva),
        switchMap(() => this.retreiveAllIva().pipe(
            map((response) => initIva({ response }))
        ))
    ));

    createIva$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createIva),
        switchMap((action) => this.createIva(
            action.percentualeIva,
            action.info).pipe(
            map((response) => initIva({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectiva'))
        ))
    ));
}