import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { FederalTaxes } from '../models/federal-taxes';
import { FederalTaxService } from '../services/federal-tax.service';

@Injectable()
export class FederalTaxStore {
  private _federalTaxes = new BehaviorSubject(new FederalTaxes());
  
  public readonly federalTaxes = this._federalTaxes.asObservable();
  
  constructor(
    private federalTaxService: FederalTaxService
  ) {
    this.loadInitialData();
  }
  
  loadInitialData() {
    const observable  = this.federalTaxService.getFederalTaxes();
    
    observable.subscribe(federalTaxes => {
      this._federalTaxes.next(federalTaxes);
    });
    
    return observable;
  }
}