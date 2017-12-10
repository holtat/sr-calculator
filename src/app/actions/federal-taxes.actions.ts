import { Action } from '@ngrx/store';

import { FederalTaxes } from '../models';

export const GET_FEDERAL_TAX = '[FederalTaxes] Get';
export const GET_FEDERAL_TAX_SUCCESS = '[FederalTaxes] Get Success';
export const GET_FEDERAL_TAX_FAILURE = '[FederalTaxes] Get Failure';

export class GetFederalTaxes implements Action {
  readonly type = GET_FEDERAL_TAX;

  constructor(public payload: { year: number }) {}
}

export class GetFederalTaxesSuccess implements Action {
  readonly type = GET_FEDERAL_TAX_SUCCESS;

  constructor(public payload: FederalTaxes) {}
}

export class GetFederalTaxesFailure implements Action {
  readonly type = GET_FEDERAL_TAX_FAILURE;

  constructor(public payload?: any) {}
}

export type Actions =
  | GetFederalTaxes
  | GetFederalTaxesSuccess
  | GetFederalTaxesFailure;
