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
  regConfig: FieldConfig[];
  StateList;
  constructor (public apiService: ApiService, public utilityService: UtilityService) {
   }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  
  ngOnInit() {
    var that = this;
    this.utilityService.getState().subscribe(function(res){
      that.StateList = res;

      that.initForm(Object.keys(res));
    });

  } 

  initForm(state){
    this.regConfig = [
      {
        type: "autocomplete",
        label: "Customer Name",
        inputType: "text",
        name: "name",
        value: '',
        classes: "col-lg-4 col-sm-6 col-xs-12",
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
        classes: 'col-lg-3 col-sm-6 col-xs-12',
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
        classes: 'col-lg-3 col-sm-6 col-xs-12',
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
        classes: 'col-lg-4 col-sm-6 col-xs-12',
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
        classes: 'col-lg-2 col-sm-6 col-xs-12',
        options: state
      },
      {
        type: "select",
        label: "City",
        name: "city",
        value: '',
        classes: 'col-lg-2 col-sm-6 col-xs-12',
        options: []
      },
      {
        type: "input",
        label: "Pincode",
        inputType: "text",
        name: "pincode",
        value: '',
        classes: 'col-lg-2 col-sm-6 col-xs-12',
        validations: [
        ]
      },
    ];
  }

  onChangeFields(value: any, formInfo){
    var that = this;
    this.utilityService.sendCustomerNameInfo(['four', 'five']);
    if(value.state != ''){
      this.regConfig.map(d => {
        if(d.name == 'city'){
          Object.keys(this.StateList).filter(function(key, val){ 
            if(key == value.values.state){ 
              d.options = that.StateList[key]; 
            } 
          });  
        }
      });
    }
  }

}
