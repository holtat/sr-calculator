import { FilingStatus, Exemption, Deduction } from './index';

export class FederalTaxForm {
  filingStatus = new FilingStatus();
  incomes: number[] = [];
  numberOfExemptions = 0;
  exemptions: Exemption[] = [];
  deductions: Deduction[] = [];

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.filingStatus = obj.filingStatus;
    this.incomes = obj.incomes;
    this.numberOfExemptions = obj.numberOfExemptions;
    this.exemptions = obj.exemptions;
    this.deductions = obj.deductions;
  }
}
