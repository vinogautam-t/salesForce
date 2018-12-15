import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {SelectionModel} from '@angular/cdk/collections';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [ApiService]
})
export class CustomersComponent implements OnInit {

  customer: CustomerData;
  isEditable: boolean;
  isDeletable: boolean;

  constructor(public dialog: MatDialog, public apiService: ApiService) { }

  displayedColumns: string[] = ['select', 'position', 'name', 'email', 'mobile_no', 'address', 'state', 'city', 'pincode'];
  dataSource = new MatTableDataSource<CustomerInfo>(ELEMENT_DATA);
  selection = new SelectionModel<CustomerData>(true, []);
  selectedRows : Array<CustomerData> = [];
  selectedIds : Array<Number> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // console.log(this.dataSource);
    // console.log(this.paginator);
    // this.paginator.length = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     this.isEditable = false;
     this.isDeletable = false;
     this.apiService.getCustomerList().subscribe((data) => {
        console.log(data);
       // ELEMENT_DATA = data;
     });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

        if(!this.isAllSelected()){
          this.dataSource.data.forEach(row => this.selection.select(row));
          this.selectedRows = this.dataSource.data;
          this.selectedRows.map(r=>{
            this.selectedIds.push(r.id);
          });
        }else{
          this.selection.clear(); 
          this.selectedRows = [];
          this.selectedIds = [];
        }
  }

  rowClick(e, row){
    // e.stopPropagation();
    if(!this.selection.isSelected(row)){
      this.selectedRows.push(row);
      this.selectedIds.push(row.id);
      (this.selection.selected.length == 0) ? this.isEditable = true : this.isEditable = false;
      this.isDeletable = true;
      // this.openDialog('edit', row);
    }else{
      let tmp_rows = [];
      let tmp_ids = [];
      this.selectedRows.map((r, index) => {
        if(r.id != row.id){
          tmp_rows.push(r);
          tmp_ids.push(r.id);
        }
        if(this.selectedRows.length-1 == index){
          this.selectedRows = tmp_rows;
          this.selectedIds = tmp_ids;
        }
      });

      if(this.selection.selected.length == 2){
        this.isEditable = true ;
      }else{
        this.isEditable = false;
      }
      if(this.selection.selected.length != 1){
        this.isDeletable = true;
      }else{
        this.isDeletable = false;
      }
    }
  }

  allRowClick(e){
    if(!this.isAllSelected()){
      this.isDeletable = true;
      this.isEditable = false;
    }else{
      this.isDeletable = false;
    }
      
  }

  editCustomer(){
    this.openDialog('edit', this.selectedRows[0]);
  }

  deleteCustomer(){
    this.openDialog('delete', this.selectedIds);
  }

  openDialog(state, values ?): void {
    
    let modalData = {};
    let width = '90%';
    if(state == 'add'){
      modalData = {'title': 'Add Customer', 'state': state, 'action': 'Add'};
    }else if(state == 'edit'){
      modalData = {'title': 'Edit Customer', 'state': state, 'values': values, 'action': 'Update'};
    }else if(state == 'delete'){
      modalData = {'title': 'Delete Customer', 'state': state, 'values': values, 'action': 'Delete'};
      width = '50%';
    }
    
    const dialogRef = this.dialog.open(CustomerAddModule, {
      width: width,
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
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
    @Inject(MAT_DIALOG_DATA) public data) {
      
    }

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
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      width: '30%',
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
      value: (!!this.data.values && !!this.data.values.email) ? this.data.values.email : '',
      width: '30%',
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
      value: (!!this.data.values && !!this.data.values.mobile_no) ? this.data.values.mobile_no : '',
      width: '30%',
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
      value: (!!this.data.values && !!this.data.values.address) ? this.data.values.address : '',
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
      value: (!!this.data.values && !!this.data.values.state) ? this.data.values.state : '',
      width: '30%',
      options: ["Tamil Nadu", "Kerela", "Andhra Pradesh", "Karnataka"]
    },
    {
      type: "select",
      label: "City",
      name: "city",
      value: (!!this.data.values && !!this.data.values.city) ? this.data.values.city : '',
      width: '30%',
      options: ["Chennai", "Madurai", "Trichy", "salem"]
    },
    {
      type: "input",
      label: "Pincode",
      inputType: "text",
      name: "pincode",
      value: (!!this.data.values && !!this.data.values.pincode) ? this.data.values.pincode : '',
      width: '30%',
      validations: [
      ]
    },
    {
      type: "button",
      label: "Save"
    }
  ];

  submit(value: any) {
    this.dialogRef.close(value);
  }

}

export interface CustomerData {
  id: number,
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
  id  :  number;
  position: number;
  email: string;
  mobile_no: string;
  address: string;
  state: string;
  city: string;
  pincode: number;
}

let ELEMENT_DATA: CustomerInfo[] = [
  {
    "id": 1,
    "position": 1,
    "name": "pradeep",
    "email": "pradeep@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600106
  },
  {
    "id": 2,
    "position": 2,
    "name": "ram",
    "email": "ram@gmail.com",
    "mobile_no": "125478963",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600105
  },
  {
    "id": 3,
    "position": 3,
    "name": "bharath",
    "email": "bharath@gmail.com",
    "mobile_no": "125478963",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 4,
    "position": 4,
    "name": "bala",
    "email": "bala@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 5,
    "position": 5,
    "name": "vasanth",
    "email": "vasanth@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 6,
    "position": 6,
    "name": "arumugam",
    "email": "arumugam@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 7,
    "position": 7,
    "name": "vinod",
    "email": "vinod@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 8,
    "position": 8,
    "name": "praveen",
    "email": "praveen@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 9,
    "position": 9,
    "name": "doss",
    "email": "doss@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 10,
    "position": 10,
    "name": "geetha",
    "email": "geetha@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 11,
    "position": 11,
    "name": "guru",
    "email": "guru@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 12,
    "position": 12,
    "name": "duruva",
    "email": "duruva@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 13,
    "position": 13,
    "name": "mahesh",
    "email": "mahesh@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 14,
    "position": 14,
    "name": "sankar",
    "email": "sankar@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 15,
    "position": 15,
    "name": "chitti",
    "email": "chitti@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 16,
    "position": 16,
    "name": "manikam",
    "email": "manikam@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 17,
    "position": 17,
    "name": "raju",
    "email": "raju@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 18,
    "position": 18,
    "name": "arul",
    "email": "arul@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 19,
    "position": 19,
    "name": "vasanthi",
    "email": "vasanthi@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  },
  {
    "id": 20,
    "position": 20,
    "name": "suganya",
    "email": "suganya@gmail.com",
    "mobile_no": "789456123",
    "address": "1st cross st",
    "state": "Tamil Nadu",
    "city": "Chennai",
    "pincode": 600001
  }
];