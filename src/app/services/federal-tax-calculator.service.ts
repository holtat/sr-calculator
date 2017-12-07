import { Injectable } from '@angular/core';

import { FederalTaxForm } from '../models/federal-tax-form';

@Injectable()
export class FederalTaxCalculatorService {
  calculate(form: FederalTaxForm) {
    const totalIncome = form.incomes.reduce((total, income) => total + Number(income || 0), 0);

    if (totalIncome <= 0) {
      return 0;
    }

    const taxBrackets = form.filingStatus.incomeTaxBrackets
      .sort(this.orderBracketsAscending);

    const indexOfTaxBracket = taxBrackets
      .findIndex(({ bracket }) => bracket >= totalIncome) - 1;
      
    const filersTaxBracket = taxBrackets[indexOfTaxBracket] || taxBrackets[taxBrackets.length - 1];
    
    return filersTaxBracket.amount + (totalIncome - filersTaxBracket.bracket) * filersTaxBracket.marginalRate * 0.01;
  }
  
  orderBracketsAscending(bracketA: any, bracketB: any) {
    return bracketA.bracket - bracketB.bracket;
  }
}