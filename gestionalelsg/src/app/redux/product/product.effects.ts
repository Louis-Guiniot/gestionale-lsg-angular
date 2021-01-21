
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import { HttpCommunicationsService } from "src/app/core/HttpCommunications/http-communications.service";
import { initProducts, retrieveAllProducts } from "./product.actions";
import { Response } from '../../core/model/Response.interface';


@Injectable()
export class ProductsEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllProduct(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("product/findAll");
    }

    getAllProducts$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retrieveAllProducts),
        switchMap(() => this.retreiveAllProduct().pipe(
            map((response) => initProducts({ response }))
        ))
    ));
}
