import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {ApiService} from '../../services/api/api.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.scss']
})
export class CustomerInputComponent implements OnInit {


  customerNameArr = [];
  
  constructor (public apiService: ApiService, public utilityService: UtilityService) {
   }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  
  ngOnInit() {
  }
  
  regConfig: FieldConfig[] = [
    {
      type: "autocomplete",
      label: "Customer Name",
      inputType: "text",
      name: "name",
      value: '',
      width: '20%',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Customer Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      value: '',
      width: '20%',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Mobile No",
      inputType: "text",
      name: "mobile_no",
      value: '',
      width: '20%',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Mobile No Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[0-9]{1,10}$"
          ),
          message: "Invalid Mobile No"
        }
      ]
    },
    {
      type: "textarea",
      label: "Address",
      name: "address",
      value: '',
      width: '30%',
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Address Required"
        }
      ]
    },
    {
      type: "select",
      label: "State",
      name: "state",
      value: '',
      width: '20%',
      options: ["Tamil Nadu", "Kerela", "Andhra Pradesh", "Karnataka"]
    },
    {
      type: "select",
      label: "City",
      name: "city",
      value: '',
      width: '20%',
      options: ["Chennai", "Madurai", "Trichy", "salem"]
    },
    {
      type: "input",
      label: "Pincode",
      inputType: "text",
      name: "pincode",
      value: '',
      width: '20%',
      validations: [
      ]
    },
  ];

  onChangeFields(value: any){
    this.utilityService.sendCustomerNameInfo(['four', 'five']);
  }

}
