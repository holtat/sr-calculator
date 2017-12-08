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