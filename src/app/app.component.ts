import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FederalTaxForm } from './models';
import { FederalTaxStore } from './stores/federal-tax.store';
import { FederalTaxCalculatorService } from './services/federal-tax-calculator.service';

@Component({
  selector: 'sr-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formGroup = this.formBuilder.group({
    filingStatus: 'single',
    incomes: this.formBuilder.array([
      { name: 'Primary' }
    ])
  });
  
  formValue$ = this.formGroup.valueChanges
    .startWith(this.formGroup.value);
  
  filingStatus$ = this.formValue$.map(form => form.filingStatus);
  
  federalTaxes$ = Observable.combineLatest(this.federalTaxStore.federalTaxes, this.filingStatus$)
    .map(([federalTaxes, filingStatus]) => federalTaxes[filingStatus])
    
  taxesPayable$ = Observable.combineLatest(this.federalTaxes$, this.formValue$)
    .filter((taxes, formValue) => !!formValue)
    .map(this.calculateTaxes.bind(this))
  
  constructor(
    private formBuilder: FormBuilder,
    private federalTaxStore: FederalTaxStore,
    private federalTaxCalculatorService: FederalTaxCalculatorService
  ) {}
  
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
    )
  }
}