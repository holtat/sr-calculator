import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'sr-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  private formGroup = this.formBuilder.group({
    incomes: this.formBuilder.array([
      { name: 'Primary'}
    ])
  });
  
  constructor(
    private formBuilder: FormBuilder
  ) {}
    
  ngOnInit() {
  }  
  
  private addIncome(event: any) {
    (this.formGroup.controls.incomes as FormArray).push(
      this.formBuilder.control({ name: 'Secondary' })
    );
  }
}