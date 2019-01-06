import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators } from "@angular/forms";
import { FieldConfig, ItemForm } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {ApiService} from '../../services/api/api.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor (public apiService: ApiService, public utilityService: UtilityService) {
  }
  regConfig: FieldConfig[];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() itemBuilder: ItemForm;

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.regConfig = [
      {
        type: "array",
        label: "Item info",
        inputType: "text",
        name: "items",
        classes: "col-lg-12 col-md-12 col-sm-12 col-xs-12",
        formArray: [
          {
            type: "autocomplete",
            label: "Item Name",
            inputType: "text",
            name: "name",
            value: '',
            classes: "col-lg-2",
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "Item Name Required"
              }
            ]
          },
          {
            type: "input",
            label: "hsn/sac",
            inputType: "text",
            name: "hsn_sac",
            value: '',
            classes: "col-lg-2",
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "hsn/sac is Required"
              }
            ]
          },
          {
            type: "input",
            label: "Qty",
            inputType: "number",
            name: "qty",
            value: '',
            classes: "col-lg-0",
            validations: [
              {
                name: "required",
                validator: Validators.required,
                message: "qty is Required"
              }
            ]
          },
          {
            type: "input",
            label: "Rate (Rs)",
            inputType: "number",
            name: "rate",
            value: '',
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "%Disc",
            inputType: "number",
            name: "rate",
            value: '',
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "%CGST",
            inputType: "number",
            name: "cgst_per",
            value: '',
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "CGST Amt",
            inputType: "number",
            name: "cgst_amt",
            value: '',
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: " %SGST",
            inputType: "number",
            name: "sgst_per",
            value: '',
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "SGST Amt",
            inputType: "number",
            name: "sgst_amt",
            value: '',
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "Total",
            inputType: "number",
            name: "item_total",
            value: '',
            classes: "col-lg-1",
            disable: true,
            validations: [
              
            ]
          },
          // {
          //   type: "button",
          //   label: "+",
          //   classes: "col-lg-2",
          //   validations: [
              
          //   ]
          // }
        ]
      },
      {
        type: "input",
        label: "Sub total",
        inputType: "number",
        name: "subTotal",
        value: '',
        classes: "col-lg-2",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Item Name Required"
          }
        ]
      },
      {
        type: "input",
        label: " total",
        inputType: "number",
        name: "Total",
        value: '',
        classes: "col-lg-2",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Item Name Required"
          }
        ]
      },
    ];
  }

  onChangeFields(value: any, formInfo){
    let that = this;
    console.log(formInfo);
    that.regConfig.map(function(fieldSet, index){
      if(fieldSet.label == 'Item info'){
        fieldSet.formArray.map((item, i) => {
          if(item.name == 'item_total'){
            that.regConfig[index].formArray[i].setValue(30);
          }
        });
      }
    });
  }


}