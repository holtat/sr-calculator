import { FilingStatus, Exemption, Deduction, FederalTaxes } from './index';
import { DeductionType } from '../enums/index';

export class FederalTaxForm {
  filingStatus = new FilingStatus();
  incomes: number[] = [];
  numberOfExemptions = 0;
  deductions: number[] = [];
  isItemizing = false;
  itemizedDeductions: number[] = [];

  static from(federalTaxes: FederalTaxes, formValue: any) {
    const taxForm = new FederalTaxForm();

    taxForm.filingStatus = federalTaxes[formValue.filingStatus];
    taxForm.incomes = formValue.incomes.map(({ annually }: any) => annually);
    taxForm.numberOfExemptions = formValue.exemptions || 0;
    taxForm.deductions = [Number(formValue['401k'] || 0), ];
    taxForm.isItemizing = formValue.deductionType === DeductionType.itemized;
    taxForm.itemizedDeductions = [Number(formValue.itemizedDeductions || 0)];

    return taxForm;
  }
}
