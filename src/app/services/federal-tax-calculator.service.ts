import { Injectable } from '@angular/core';

import { FederalTaxForm } from '../models/federal-tax-form';

@Injectable()
export class FederalTaxCalculatorService {

  /**
   * calculate - Calculates federal tax amount
   *
   * @param  {type} form: FederalTaxForm
   * @return {type} number: The amount of federal taxes owed
   */
  calculate(form: FederalTaxForm): number {
    const totalIncome = form.incomes.reduce((total, income) => total + Number(income || 0), 0);

    const taxedIncome = totalIncome
      - form.deductions.reduce((total, deduction) => total + deduction, 0)
      - form.numberOfExemptions * form.filingStatus.exemptions[0].exemptionAmount
      - (form.isItemizing
      ? form.itemizedDeductions.reduce((total, deduction) => total + deduction, 0)
      : form.filingStatus.deductions[0].deductionAmount);

    if (taxedIncome <= 0) {
      return 0;
    }

    const taxBrackets = form.filingStatus.incomeTaxBrackets
      .sort(this.orderBracketsAscending);

    const indexOfTaxBracket = taxBrackets
      .findIndex(({ bracket }) => bracket >= taxedIncome) - 1;

    const filersTaxBracket = taxBrackets[indexOfTaxBracket] || taxBrackets[taxBrackets.length - 1];

    return filersTaxBracket.amount
      + (taxedIncome - filersTaxBracket.bracket) * filersTaxBracket.marginalRate * 0.01;
  }

  private orderBracketsAscending(bracketA: any, bracketB: any) {
    return bracketA.bracket - bracketB.bracket;
  }
}
