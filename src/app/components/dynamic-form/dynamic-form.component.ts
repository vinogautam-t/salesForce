import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form ng-if='!!form' class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)" (changeEvent)="onChangeFields($event)">
  <ng-container *ngFor="let field of fields;">
    <ng-container ng-if='field.type != "array"' dynamicField [field]="field" [group]="form"></ng-container>

    <ng-container ng-if='field.type == "array" && !!form.controls?.items?' formArrayName="{{field.name}}">
        <ng-container *ngFor="let innerField of form.controls?.items?.controls; let i = index;">
          <div [formGroupName]="i">
          <ng-container *ngFor="let iField of field.formArray;">
              <ng-container dynamicField [field]="iField" [group]="form.controls?.items?.controls[i]"></ng-container>
          </ng-container>    
          </div>
        </ng-container>
    </ng-container>

  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  @Output() changeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
    //console.log(this.form);
    this.initChangeCall();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  get itemForms() {
    return this.form.get('item') as FormArray;
  }

  addItem(item) {
    const itemField = this.fb.group({});
    item.forEach((innerField, innerIndex) => {
      const control = this.fb.control(
        innerField.value,
        this.bindValidations(innerField.validations || [])
      );
      itemField.addControl(innerField.name, control);
      if(this.fields.length-1 == innerIndex){
        
      }
    });
    return itemField;
    // return this.fb.group({
    //   name: '',
    //   description: '',
    //   price: ''
    // });
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach((field, index) => {
      if (field.type === "button") return;
      if(field.type === "array"){
        var itemArr = this.fb.array([this.addItem(field.formArray)]);
        group.addControl(field.name, itemArr);
        // this.addItem(field.formArray, group);
      }else{
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
        if(this.fields.length-1 == index){
          
        }
      }
    });
    return group;
  }

  initChangeCall() {
    this.form.valueChanges.subscribe(val => {
      this.changeEvent.emit(val);
    });
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}