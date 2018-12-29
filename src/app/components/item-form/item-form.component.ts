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

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  @Input() itemBuilder: ItemForm;

  ngOnInit() {
    
  }

  onChangeFields(value: any){
    
  }



  regConfig: FieldConfig[] = [
    {
      type: "array",
      label: "Item info",
      inputType: "text",
      name: "items",
      width: '20%',
      formArray: [
        {
          type: "autocomplete",
          label: "Item Name",
          inputType: "text",
          name: "name",
          value: '',
          width: '20%',
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
          width: '10%',
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
          width: '10%',
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
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "Disc %",
          inputType: "number",
          name: "rate",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "CGST %",
          inputType: "number",
          name: "cgst_per",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "CGST Amt",
          inputType: "number",
          name: "cgst_amt",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "SGST %",
          inputType: "number",
          name: "sgst_per",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "SGST Amt",
          inputType: "number",
          name: "sgst_amt",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        {
          type: "input",
          label: "Total",
          inputType: "number",
          name: "item_total",
          value: '',
          width: '10%',
          validations: [
            
          ]
        },
        // {
        //   type: "button",
        //   label: "+",
        //   width: '5%',
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
      width: '10%',
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
      width: '10%',
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