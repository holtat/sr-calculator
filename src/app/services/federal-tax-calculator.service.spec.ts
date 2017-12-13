import { TestBed, inject } from '@angular/core/testing';
import { FederalTaxCalculatorService } from './federal-tax-calculator.service';
import { FederalTaxForm, FilingStatus, IncomeTaxBracket, FederalTaxes } from '../models';

describe('Federal Tax Calculator Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FederalTaxCalculatorService
      ]
    });
  });

  describe('calculate', () => {
    describe('when it receives a valid form', () => {
      const validForm = FederalTaxForm.from(
        new FederalTaxes({
          single: FilingStatus.fromJson({
            income_tax_brackets: [
              {
                bracket: 0,
                marginal_rate: 10,
                marginal_capital_gain_rate: 0,
                amount: 0
              },
              {
                bracket: 9325,
                marginal_rate: 15,
                marginal_capital_gain_rate: 0,
                amount: 932.5
              }
            ]
          })
        }),
        {
          filingStatus: 'single',
          incomes: [10000]
        }
      );

      it('should return the amount of federal tax owed', inject([FederalTaxCalculatorService],
        (federalTaxCalculatorService: FederalTaxCalculatorService) => {
          const result = federalTaxCalculatorService.calculate(validForm);

          expect(result).toBe(1033.75);
        })
      );
    });
  });
});
