import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { IncomeInputComponent } from './components/income-input.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    IncomeInputComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}