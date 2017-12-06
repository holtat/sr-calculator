import { Injectable } from '@angular/core';

import { FederalTaxForm } from '../models/federal-tax-form';

@Injectable()
export class FederalTaxCalculatorService {
  calculate(form: FederalTaxForm) {
    return form.incomes.reduce((prev, income) => prev + Number(income) || 0, 0);
  }
}