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
    incomes: this.formBuilder.array([
      { name: 'Primary' }
    ]),
    deductionType: DeductionType.standard,
    '401k': ''
  });

  formValue$ = this.formGroup.valueChanges
    .startWith(this.formGroup.value);

  federalTaxes$: Observable<FederalTaxes> = this.store.select('entities')
    .map((entities: { federalTaxes: any }) => entities.federalTaxes)
    .filter(federalTaxes => !!federalTaxes);

  annualIncomes$ = this.formValue$
    .map(form => form.incomes.map((income: any) => income.annually))
    .startWith(0);

  filingStatus$: Observable<FilingStatus> =
    Observable.combineLatest(this.federalTaxes$, this.formValue$)
      .map(([federalTaxes, formValue]) => federalTaxes[formValue.filingStatus]);

  pretaxDeductions$ = this.formValue$.map(form => [form['401k']])
    .startWith([0]);

  isItemizingDeduction$ = this.formValue$.map(form =>
    form.deductionType === DeductionType.itemized);

  standardDeduction$ = this.filingStatus$.map(filingStatus =>
    filingStatus.deductions.map((deduction: any) => deduction.deductionAmount));

  itemizedDeductions$ = Observable.of([30000]);

  deductions$ = this.formValue$
    .switchMap((value: any) => value.deductionType === DeductionType.itemized
      ? this.itemizedDeductions$
      : this.standardDeduction$);

  taxesPayable$ = Observable.combineLatest(
    this.filingStatus$,
    this.annualIncomes$,
    this.deductions$,
    this.pretaxDeductions$
  )
    .map(this.calculateTaxes.bind(this))
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
      this.formBuilder.control({ name: 'Secondary' })
    );
  }

  private calculateTaxes([filingStatus, incomes, deductions, pretaxDeductions]: any): number {
    return this.federalTaxCalculatorService.calculate(
      new FederalTaxForm({
        filingStatus,
        incomes,
        deductions,
        pretaxDeductions
      })
    );
  }
}
