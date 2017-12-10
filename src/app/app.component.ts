import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { FederalTaxForm } from './models';
import { FederalTaxCalculatorService } from './services/federal-tax-calculator.service';
import { GetFederalTaxes } from './actions';

interface AppState {
  entities: {};
}

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
    ])
  });

  formValue$ = this.formGroup.valueChanges
    .startWith(this.formGroup.value);

  filingStatus$ = this.formValue$.map(form => form.filingStatus);

  entities$ = this.store.select('entities')
    .map((entities: { federalTaxes: any }) => entities.federalTaxes)
    .filter(federalTaxes => !!federalTaxes);

  federalTaxes$ = Observable.combineLatest(this.entities$, this.filingStatus$)
    .map(([federalTaxes, filingStatus]) => federalTaxes[filingStatus]);

  taxesPayable$ = Observable.combineLatest(this.federalTaxes$, this.formValue$)
    .filter((taxes, formValue) => !!formValue)
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

  private calculateTaxes([federalTaxes, formValue]: any[]): number {
    return this.federalTaxCalculatorService.calculate(
      new FederalTaxForm({
        filingStatus: federalTaxes,
        incomes: formValue.incomes.map(({ annually }: any) => annually)
      })
    );
  }
}
