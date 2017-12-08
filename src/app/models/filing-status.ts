import { Deduction, Exemption, IncomeTaxBracket } from './index';

export class FilingStatus {
  incomeTaxBrackets: IncomeTaxBracket[];
  deductions: Deduction[]
  exemptions: Exemption[];
  
  static fromJson(json?: any) {
    const filingStatus = new FilingStatus();

    if (!json) {
      return filingStatus;
    }
    
    if (json.income_tax_brackets) {
      filingStatus.incomeTaxBrackets = json.income_tax_brackets.map((taxBracket: any) =>
        IncomeTaxBracket.fromJson(taxBracket));
    }
    
    if (json.deductions) {
      filingStatus.deductions = json.deductions.map((deduction: any) =>
        Deduction.fromJson(deduction));
    }
    
    if (json.exemptions) {
      filingStatus.exemptions = json.exemptions.map((exemption: any) =>
        Exemption.fromJson(exemption));
    }
    
    return filingStatus;
  }
}