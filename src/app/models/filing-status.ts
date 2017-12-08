import { Deduction, Exemption, IncomeTaxBracket } from './index';

export class FilingStatus {
  incomeTaxBrackets: IncomeTaxBracket[];
  deductions: Deduction[]
  exemptions: Exemption[];
  
  constructor(json?: any) {
    if (!json) {
      return;
    }
    
    this.incomeTaxBrackets = json.income_tax_brackets.map((taxBracket: any) => new IncomeTaxBracket(taxBracket));
    this.deductions = json.deductions.map((deduction: any) => new Deduction(deduction));
    this.exemptions = json.exemptions.map((exemption: any) => new Exemption(exemption));
  }
}