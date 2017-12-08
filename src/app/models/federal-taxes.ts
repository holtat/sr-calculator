import { Deduction, Exemption, IncomeTaxBracket, FilingStatus } from './index';

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
