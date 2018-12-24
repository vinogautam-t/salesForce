import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

@Component({
  selector: 'app-textarea',
  template: `
            <mat-form-field class="demo-full-width" [formGroup]="group" [ngStyle]="{'width': field.width}">
            <textarea  matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType"></textarea>
            <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
            <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
            </ng-container>
            </mat-form-field>`,
  styles: []
})
export class TextareaComponent implements OnInit {

  constructor() { }
  field: any;
  group: any;
  ngOnInit() {
  }

}
