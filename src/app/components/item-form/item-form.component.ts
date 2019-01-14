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
  itemIntiValues = {'items': [], 'Total': 0,'sgstTotal': 0,'cgstTotal': 0};

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
            value: 0,
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
            value: 0,
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "%Disc",
            inputType: "number",
            name: "disc",
            value: 0,
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "%CGST",
            inputType: "number",
            name: "cgst_per",
            value: 0,
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "CGST Amt",
            inputType: "number",
            name: "cgst_amt",
            value: 0,
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: " %SGST",
            inputType: "number",
            name: "sgst_per",
            value: 0,
            classes: "col-lg-0",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "SGST Amt",
            inputType: "number",
            name: "sgst_amt",
            value: 0,
            classes: "col-lg-1",
            validations: [
              
            ]
          },
          {
            type: "input",
            label: "Total",
            inputType: "number",
            name: "item_total",
            value: 0,
            classes: "col-lg-1",
            disable: true,
            validations: [
              
            ]
          },
        ]
      },
      {
        type: "input",
        label: "Overall Total",
        inputType: "number",
        name: "Total",
        value: 0,
        classes: "col-lg-1 pull-right",
        validations: [
          
        ]
      },
      {
        type: "input",
        label: "SGST Total",
        inputType: "number",
        name: "sgstTotal",
        value: 0,
        classes: "col-lg-1 pull-right",
        validations: [
          
        ]
      },
      {
        type: "input",
        label: "CGST Total",
        inputType: "number",
        name: "cgstTotal",
        value: 0,
        classes: "col-lg-1 pull-right",
        validations: [
          
        ]
      },
    ];
  }

  modifiedItemArr(Obj: any){
    var that = this;
    if(Obj.action == 'add'){
      that.itemIntiValues.items.push(
        {
          'name': '',
          'hsn_sac': '',
          'qty': 0,
          'rate': 0,
          'disc': 0,
          'cgst_per': 0,
          'cgst_amt': 0,
          'sgst_per': 0,
          'sgst_amt': 0,
          'item_total': 0
        }
      );
    }else if(Obj.action == 'remove'){
      that.itemIntiValues.items.splice(Obj.index, 1);
    }
  }

  onChangeFields(Obj: any){
    let that = this;
    let otherItemValue = {'items': [], 'Total': 0,'sgstTotal': 0,'cgstTotal': 0};
    if(JSON.stringify(Obj.values) != JSON.stringify(that.itemIntiValues)){
      Obj.formInfo.controls.items.controls.map(function(item, index){
        let itemValues = Obj.values.items[index];
        let calcItem = Obj.values.items[index];
        // calcItem.rate = 0; calcItem.item_total = 0; calcItem.cgst_amt = 0; calcItem.sgst_amt = 0;
        let perVal = 0;
        if(itemValues.rate != "" && itemValues.rate != 0 && itemValues.disc != "" && itemValues.disc != 0){
          perVal = (parseFloat(itemValues.rate) * parseFloat(itemValues.disc)) / 100;
        }
        if(calcItem.rate == 0){
          calcItem.rate = parseFloat(itemValues.rate);
        }
        calcItem.rate = parseFloat(calcItem.rate);
        if(itemValues.rate != "" && itemValues.rate != 0 && itemValues.qty != "" && itemValues.qty != 0){
         
          calcItem.item_total = (calcItem.rate - perVal) * parseFloat(itemValues.qty);
          otherItemValue.Total = otherItemValue.Total + calcItem.item_total;
          
          Obj.values.items[index].item_total = calcItem.item_total;
        }
  
        if(itemValues.cgst_per != "" && itemValues.cgst_per != 0 && itemValues.item_total != "" && itemValues.item_total != 0){
          calcItem.cgst_amt = (itemValues.item_total * itemValues.cgst_per) / 100
          Obj.values.items[index].cgst_amt = calcItem.cgst_amt;
          otherItemValue.cgstTotal = otherItemValue.cgstTotal + calcItem.cgst_amt;
          
        }
  
        if(itemValues.sgst_per != "" && itemValues.sgst_per != 0 && itemValues.item_total != "" && itemValues.item_total != 0){
          calcItem.sgst_amt = (itemValues.item_total * itemValues.sgst_per) / 100
          Obj.values.items[index].sgst_amt = calcItem.sgst_amt;
          otherItemValue.sgstTotal = otherItemValue.sgstTotal + calcItem.sgst_amt;
         
        }
          otherItemValue.items.push(calcItem);
      });

      otherItemValue.Total = otherItemValue.Total + otherItemValue.cgstTotal;
      otherItemValue.Total = otherItemValue.Total + otherItemValue.sgstTotal;

      that.itemIntiValues = otherItemValue;
      Obj.formInfo.patchValue(otherItemValue);
    }
      
  }


}