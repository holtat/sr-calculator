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