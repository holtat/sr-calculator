export class Deduction {
  deductionName = '';
  deductionAmount = 0;
  
  constructor(json?: any) {
    if (!json) {
      return;
    }
    
    this.deductionName = json.deduction_name;
    this.deductionAmount = json.deduction_amount;
  }
}

export class Exemption {
  exemptionName = '';
  exemptionAmount = 0;
  
  constructor(json?: any) {
    if (!json) {
      return;
    }
    
    this.exemptionName = json.exemption_name;
    this.exemptionAmount = json.exemption_amount;
  }
}

export class IncomeTaxBracket {
  bracket = 0;
  marginalRate = 0;
  marginalCapitalGainRate = 0;
  amount = 0;
  
  constructor(json?: any) {
    if (!json) {
      return;
    }
    
    this.bracket = json.bracket;
    this.marginalRate = json.marginal_rate;
    this.marginalCapitalGainRate = json.marginal_capital_gain_rate;
    this.amount = json.amount;
  }
}

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

export class FederalTaxes {
  single: FilingStatus;
  married: FilingStatus;
  marriedSeparately: FilingStatus;
  headOfHousehold: FilingStatus
  
  constructor(json?: any) {
    if (!json) {
      return;
    }

    this.single = new FilingStatus(json.single);
    this.married = new FilingStatus(json.married);
    this.marriedSeparately = new FilingStatus(json.married_separately);
    this.headOfHousehold = new FilingStatus(json.head_of_household);
  }
}
