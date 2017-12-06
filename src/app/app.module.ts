import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FederalTaxStore } from './stores/federal-tax.store';
import { FederalTaxService } from './services/federal-tax.service';
import { FederalTaxCalculatorService } from './services/federal-tax-calculator.service';
import { IncomeInputComponent } from './components/income-input.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    IncomeInputComponent
  ],
  providers: [
    FederalTaxStore,
    FederalTaxService,
    FederalTaxCalculatorService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}