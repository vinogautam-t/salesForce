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
  <form *ngIf='!!form' class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)" (changeEvent)="onChangeFields($event, 'form')">
  <ng-container *ngFor="let field of fields; let ind = index; trackBy:ind;">
    <ng-container *ngIf='field.type != "array"' dynamicField [field]="field" [group]="form">
    
    </ng-container>

    <ng-container *ngIf='field.type == "array"' formArrayName="{{field.name}}">
        <ng-container *ngFor="let innerField of form.controls?.items?.controls; let i = index; trackBy:i;">
         <div class='row'>
          <ng-container *ngFor="let iField of field.formArray; let ix = index; trackBy:ix;">
              <ng-container dynamicField [field]="iField" [group]="form.controls?.items?.controls[i]"></ng-container>
          </ng-container>   
          <div class=" margin-top" >
            <button class='pull-right margin-right' mat-raised-button color="primary" (click)="addArray(field.formArray)" *ngIf='i == form.controls?.items?.controls.length-1'> + </button>
            <button class='pull-right margin-right' mat-raised-button color="primary" (click)="removeArray(i)" *ngIf='form.controls?.items?.controls.length-1 != 0'> - </button>
          </div> 
          </div>
        </ng-container>
    </ng-container>

  </ng-container>
  </form>
  `,
  styles: [
    '.margin-right { margin-right: 10px; } '
      
  ]
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
  }

  addArray(formArray): void {
    var items = this.form.get('items') as FormArray;
    items.push(this.addItem(formArray));
  }

  removeArray(i): void {
    var items = this.form.get('items') as FormArray;
    items.removeAt(i);
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
}