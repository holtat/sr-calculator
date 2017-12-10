export class Deduction {
  deductionName = '';
  deductionAmount = 0;

  static fromJson(json?: any) {
    const deduction = new Deduction();

    if (!json) {
      return deduction;
    }

    deduction.deductionName = json.deduction_name;
    deduction.deductionAmount = json.deduction_amount;

    return deduction;
  }
}
