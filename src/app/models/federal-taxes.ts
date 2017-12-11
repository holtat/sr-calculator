import { Deduction, Exemption, IncomeTaxBracket, FilingStatus } from './index';

export class FederalTaxes {
  single: FilingStatus;
  married: FilingStatus;
  marriedSeparately: FilingStatus;
  headOfHousehold: FilingStatus;

  constructor(json?: any) {
    if (!json) {
      return;
    }

    this.single = FilingStatus.fromJson(json.single);
    this.married = FilingStatus.fromJson(json.married);
    this.marriedSeparately = FilingStatus.fromJson(json.married_separately);
    this.headOfHousehold = FilingStatus.fromJson(json.head_of_household);
  }
}
