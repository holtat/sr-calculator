export class Exemption {
  exemptionName = '';
  exemptionAmount = 0;

  static fromJson(json?: any) {
    const exemption = new Exemption();

    if (!json) {
      return exemption;
    }

    exemption.exemptionName = json.exemption_name;
    exemption.exemptionAmount = json.exemption_amount;

    return exemption;
  }
}
