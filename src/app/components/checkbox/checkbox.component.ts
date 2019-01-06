import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: ` <div [formGroup]="group" [ngClass]="field.classes">
              <mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
              </div> `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}