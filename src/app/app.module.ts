import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FederalTaxCalculatorService } from './services/federal-tax-calculator.service';
import { IncomeInputComponent } from './components/income-input.component';
import { reducers } from './reducers';
import { effects } from './effects';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    AppComponent,
    IncomeInputComponent
  ],
  providers: [
    FederalTaxCalculatorService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
