import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { initPayConditions, retreiveAllPayConditions } from "./payCondition.actions";
import { Response } from '../../core/model/Response.interface';

@Injectable()
export class PayConditionEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllPaymentConditions(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("paycondition/findAll");
    }

    getAllPayConditions$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllPayConditions),
        switchMap(() => this.retreiveAllPaymentConditions().pipe(
            map((response) => initPayConditions({ response }))
        ))
    ));

}