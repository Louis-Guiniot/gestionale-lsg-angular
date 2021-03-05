import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { initPayCondition, retreiveAllPayConditions } from "./payCondition.actions";

@Injectable()
export class PayConditionEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retrieveAllPayConditions(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("payCondition/findAll");
    }

    // getAllPayConditions$: Observable<Action> = createEffect(() => this.actions$.pipe(
    //     ofType(retreiveAllPayConditions),
    //     switchMap(() => this.retrieveAllPayConditions().pipe(
    //         map((response) => initPayCondition({ response }))
    //     ))
    // ));

}