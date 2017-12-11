import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { environment } from '../environments/environment';
import * as actions from '../actions';
import { FederalTaxes } from '../models';

@Injectable()
export class FederalTaxesEffects {

  @Effect() get$: Observable<Action> = this.actions$.ofType(actions.GET_FEDERAL_TAX)
    .mergeMap((action: actions.GetFederalTaxes) => {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${environment.taxeeBearerToken}`
      );

      return this.http.get(`https://taxee.io/api/v2/federal/${action.payload.year}`, { headers })
        .map(data => new FederalTaxes(data))
        .map(payload => new actions.GetFederalTaxesSuccess(payload))
        .catch(() => of(new actions.GetFederalTaxesFailure()));
    });

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {}

}
