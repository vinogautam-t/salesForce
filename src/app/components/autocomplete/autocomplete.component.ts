import { Component, OnInit, Input} from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: 'app-autocomplete',
  template: `
              <mat-form-field class="demo-full-width" [formGroup]="group" [ngStyle]="{'width': field.width}">
                <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                  <mat-option *ngFor="let v of field.options" [value]="v">
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
  constructor() { }

  ngOnInit() {
  }

}
