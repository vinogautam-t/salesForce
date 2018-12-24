import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { UtilityService } from '../../services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  template: `
              <mat-form-field class="demo-full-width" [formGroup]="group" [ngStyle]="{'width': field.width}">
                <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                  <mat-option *ngFor="let v of options" [value]="v">
                    <span>{{v}}</span>
                  </mat-option>
                </mat-autocomplete>
                <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
                <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
                </ng-container>
              </mat-form-field>
            `,
  styles: []
})
export class AutocompleteComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  options: any;
  subscription: Subscription;

  constructor(public utilityService: UtilityService) {
   }

   ngOnInit() {
    console.log(this.options);
    this.subscription = this.utilityService.getCustomerNameInfo().subscribe(message => { 
      this.options = message; 
      console.log(this.options);
    });
   }

  // ngOnDestroy() {
  //     // unsubscribe to ensure no memory leaks
  //     this.subscription.unsubscribe();
  // }

}
