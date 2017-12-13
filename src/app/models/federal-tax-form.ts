import { FilingStatus, Exemption, Deduction } from './index';

export class FederalTaxForm {
  filingStatus = new FilingStatus();
  incomes: number[] = [];
  numberOfExemptions = 0;
  exemptions: Exemption[] = [];
  deductions: number[] = [];
  pretaxDeductions: number [] = [];

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.filingStatus = obj.filingStatus;
    this.incomes = obj.incomes;
    this.numberOfExemptions = obj.numberOfExemptions;
    this.exemptions = obj.exemptions;
    this.deductions = obj.deductions;
    this.pretaxDeductions = obj.pretaxDeductions;
  }
}
