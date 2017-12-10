import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sr-income-input',
  templateUrl: './income-input.component.html',
  styleUrls: ['./income-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IncomeInputComponent), // tslint:disable-line
    multi: true
  }]
})
export class IncomeInputComponent implements ControlValueAccessor {
  private _value: any = {};
  private onChange: any = () => {};
  private onTouched = () => {};

  get value() {
    return this._value;
  }

  set value(obj: any) {
    if (obj.monthly !== this._value.monthly) {
      obj.annually = obj.monthly * 12;
    } else if (obj.annually !== this._value.annually) {
      obj.monthly = obj.annually / 12;
    }

    this._value = obj;
    this.onChange(this._value);
    this.onTouched();
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
