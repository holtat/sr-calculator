import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { FederalTaxForm, FederalTaxes, FilingStatus, AppState } from './models';
import { FederalTaxCalculatorService } from './services/federal-tax-calculator.service';
import { GetFederalTaxes } from './actions';
import { DeductionType } from './enums/index';

@Component({
  selector: 'sr-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formGroup = this.formBuilder.group({
    filingStatus: 'single',
    exemptions: 1,
    incomes: this.formBuilder.array([
      { name: 'Primary' }
    ]),
    deductionType: DeductionType.standard,
    '401k': '',
    itemizedDeductions: ''
  });

  formValue$ = this.formGroup.valueChanges
    .startWith(this.formGroup.value);

  federalTaxes$: Observable<FederalTaxes> = this.store.select('entities')
    .map((entities: { federalTaxes: any }) => entities.federalTaxes)
    .filter(federalTaxes => !!federalTaxes);

  isItemizingDeduction$ = this.formValue$.map(form =>
    form.deductionType === DeductionType.itemized);

  taxesPayable$ = Observable.combineLatest([this.federalTaxes$, this.formValue$])
    .map(this.calculateTaxes.bind(this))
    .startWith(0);

  effectiveTaxRate$ = Observable.combineLatest([this.taxesPayable$, this.formValue$])
    .filter(([_, formValue]) => formValue.incomes.some((income: any) => income.annually > 0))
    .map(this.calculateEffectiveTaxRate.bind(this))
    .startWith(0);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private federalTaxCalculatorService: FederalTaxCalculatorService
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetFederalTaxes({ year: 2017 }));
  }

  private addIncome(event: any) {
    (this.formGroup.controls.incomes as FormArray).push(
      this.formBuilder.control({ name: 'Secondary' }));
  }

  private calculateTaxes([federalTaxes, formValue]: any): number {
    return this.federalTaxCalculatorService.calculate(
      FederalTaxForm.from(federalTaxes, formValue));
  }

  private calculateEffectiveTaxRate([taxesPayable, formValue]: any) {
    const totalIncome = formValue.incomes
      .reduce((total: any, income: any) => total + Number(income.annually || 0), 0);

    return totalIncome ? taxesPayable / totalIncome * 100 : 0;
  }
}
