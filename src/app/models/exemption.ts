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