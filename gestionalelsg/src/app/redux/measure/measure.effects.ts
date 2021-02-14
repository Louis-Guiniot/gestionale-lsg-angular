
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";

import { Response } from '../../core/model/Response.interface';
import { createMeasure, initMeasures, retrieveAllMeasures } from "./measure.actions";



@Injectable()
export class MeasureEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

   
    retreiveAllMeasures(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("measure/findAll");
    }

    getAllMeasures$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllMeasures),
        switchMap(() => this.retreiveAllMeasures().pipe(
            map((response) => initMeasures({ response }))
        ))
    ));


    createMeasure(tipo:string): Observable<Response>{
        return this.http.retrievePostCall<Response>('measure/create',{tipo});
    }
    
    createMeasure$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createMeasure),
        switchMap((action) => this.createMeasure(
            action.tipo,
            ).pipe(
            map((response) => initMeasures({ response })),
           tap(()=>this.router.navigateByUrl('/home'))
        ))
    ));


   
}
