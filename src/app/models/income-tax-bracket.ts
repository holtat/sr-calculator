export class IncomeTaxBracket {
  bracket = 0;
  marginalRate = 0;
  marginalCapitalGainRate = 0;
  amount = 0;

  static fromJson(json?: any) {
    const incomeTaxBracket = new IncomeTaxBracket();

    if (!json) {
      return incomeTaxBracket;
    }

    incomeTaxBracket.bracket = json.bracket;
    incomeTaxBracket.marginalRate = json.marginal_rate;
    incomeTaxBracket.marginalCapitalGainRate = json.marginal_capital_gain_rate;
    incomeTaxBracket.amount = json.amount;

    return incomeTaxBracket;
  }
}
