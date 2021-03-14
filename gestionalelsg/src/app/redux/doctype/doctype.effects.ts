import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { Response } from '../../core/model/Response.interface';
import { Action } from "@ngrx/store";
import { initDoc, retreiveAllDoc } from "./doctype.actions";

@Injectable()
export class DocEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllDoc(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("doctype/findAll");
    }

    getAllDoc$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllDoc),
        switchMap(() => this.retreiveAllDoc().pipe(
            map((response) => initDoc({ response }))
        ))
    ));
}