import { Action } from '@ngrx/store';
import { FederalTaxes } from '../models';
import * as federalTaxes from '../actions/federal-taxes.actions';

const INITIAL_STATE: {
  federalTaxes: FederalTaxes
} = {
  federalTaxes: null
};

export const entitiesReducer = (state = INITIAL_STATE, action: federalTaxes.Actions) => {
  switch (action.type) {
    case federalTaxes.GET_FEDERAL_TAX_SUCCESS:
      return {
        ...state,
        federalTaxes: action.payload
      };
    default:
      return state;
  }
};
