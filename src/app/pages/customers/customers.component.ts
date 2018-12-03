import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customer: CustomerData;

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['position', 'name', 'email', 'mobile_no', 'address', 'state', 'city', 'pincode'];
  dataSource = new MatTableDataSource<CustomerInfo>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddModule, {
      width: '90%',
      data: {name: 'pradeep', animal: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.customer = result;
    });
  }

}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer/add-customer.component.html',
})
export class CustomerAddModule {

  constructor(
    public dialogRef: MatDialogRef<CustomerAddModule>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Name",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
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
      value: "",
      options: ["Tamil Nadu", "Kerela", "Andhra Pradesh", "Karnataka"]
    },
    {
      type: "select",
      label: "City",
      name: "city",
      value: "",
      options: ["Chennai", "Madurai", "Trichy", "salem"]
    },
    {
      type: "input",
      label: "Pincode",
      inputType: "text",
      name: "pincode",
      validations: [
      ]
    },
  ];

  submit(value: any) {}

}

export interface CustomerData {
  name: string;
  email: string;
  mobile_no: string;
  address: string;
  state: string;
  city: string;
  pincode: number;
}

export interface CustomerInfo {
  name: string;
  position: number;
  email: string;
  mobile_no: string;
  address: string;
  state: string;
  city: string;
  pincode: number;
}

const ELEMENT_DATA: CustomerInfo[] = [
  {position: 1, name: 'pradeep', email: 'pradeep@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600106},
  {position: 2, name: 'ram', email: 'ram@gmail.com', mobile_no: '125478963', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600105},
  {position: 3, name: 'bharath', email: 'bharath@gmail.com', mobile_no: '125478963', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 4, name: 'bala', email: 'bala@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 5, name: 'vasanth', email: 'vasanth@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 6, name: 'arumugam', email: 'arumugam@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 7, name: 'vinod', email: 'vinod@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 8, name: 'praveen', email: 'praveen@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 9, name: 'doss', email: 'doss@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 10, name: 'geetha', email: 'geetha@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 11, name: 'guru', email: 'guru@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 12, name: 'duruva', email: 'duruva@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 13, name: 'mahesh', email: 'mahesh@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 14, name: 'sankar', email: 'sankar@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 15, name: 'chitti', email: 'chitti@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 16, name: 'manikam', email: 'manikam@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 17, name: 'raju', email: 'raju@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 18, name: 'arul', email: 'arul@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 19, name: 'vasanthi', email: 'vasanthi@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
  {position: 20, name: 'suganya', email: 'suganya@gmail.com', mobile_no: '789456123', 'address': '1st cross st', state: 'Tamil Nadu', city: 'chennai', pincode: 600001},
];