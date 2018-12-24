import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
  import { FormGroup } from "@angular/forms";
  import { FieldConfig } from "../../field.interface";
  import { InputComponent } from "../input/input.component";
  import { ButtonComponent } from "../button/button.component";
  import { SelectComponent } from "../select/select.component";
  import { DateComponent } from "../date/date.component";
  import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
  import { CheckboxComponent } from "../checkbox/checkbox.component";
  import { TextareaComponent } from "../textarea/textarea.component";
  import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

  const componentMapper = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    checkbox: CheckboxComponent,
    textarea: TextareaComponent,
    autocomplete: AutocompleteComponent,
    array: Array
  };

@Directive({
  selector: '[dynamicField]'
})

export class DynamicFieldDirective implements OnInit {
  
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;

  constructor(

    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef

  ) { }

  ngOnInit() {
    if(this.field.type != 'array'){
      this.buildComponent(this.field);
    }else{
      var that = this;
      this.field.formArray.forEach(function(row, index){
        that.buildComponent(row);
      });
    }
      
  }

  buildComponent(field) {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = field;
    this.componentRef.instance.group = this.group;
  }

}
