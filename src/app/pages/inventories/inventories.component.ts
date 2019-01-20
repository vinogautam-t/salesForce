import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {SelectionModel} from '@angular/cdk/collections';
import { UtilityService } from '../../services/utility.service';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss']
})
export class InventoriesComponent implements OnInit {

  product: ProductData;
  isEditable: boolean;
  isDeletable: boolean;

  constructor(public dialog: MatDialog, public apiService: ApiService, public utilityService: UtilityService) { }

  displayedColumns: string[] = ['select', 'position', 'name', 'hsn_sac', 'product_code', 'stock', 'moq', 'purchase_price', 'sales_price'];
  dataSource = new MatTableDataSource<ProductInfo>(ELEMENT_DATA);
  selection = new SelectionModel<ProductData>(true, []);
  selectedRows : Array<ProductData> = [];
  selectedIds : Array<Number> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     this.isEditable = false;
     this.isDeletable = false;
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

  editProduct(){
    this.openDialog('edit', this.selectedRows[0]);
  }

  deleteProduct(){
    this.openDialog('delete', this.selectedIds);
  }

  openDialog(state, values ?): void {
    
    let modalData = {};
    let width = '90%';
    if(state == 'add'){
      modalData = {'title': 'Add Product', 'state': state, 'action': 'Add'};
    }else if(state == 'edit'){
      modalData = {'title': 'Edit Product', 'state': state, 'values': values, 'action': 'Update'};
    }else if(state == 'delete'){
      modalData = {'title': 'Delete Product', 'state': state, 'values': values, 'action': 'Delete'};
      width = '50%';
    }
    
    const dialogRef = this.dialog.open(ProductAddModule, {
      width: width,
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.product = result;
    });
  }

}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class ProductAddModule {

  constructor(
    public dialogRef: MatDialogRef<ProductAddModule>,
    @Inject(MAT_DIALOG_DATA) public data, public utilityService: UtilityService) {
      // this.utilityService.getState().subscribe(function(res){
      //   console.log(res);
      // });
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Product Name",
      inputType: "text",
      name: "name",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name required"
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
      label: "Hsn / Sac",
      inputType: "text",
      name: "hsn_sac",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "HSN / SAC required"
        }
      ]
    },
    {
      type: "input",
      label: "Product Code",
      inputType: "text",
      name: "product_code",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Product code required"
        }
      ]
    },
    {
      type: "input",
      label: "Stock",
      inputType: "number",
      name: "stock",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Stock required"
        }
      ]
    },
    {
      type: "input",
      label: "Minimun Order Qty",
      inputType: "number",
      name: "moq",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "MOQ required"
        }
      ]
    },
    {
      type: "input",
      label: "Purchase price",
      inputType: "number",
      name: "purchase_price",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Purchase price is required"
        }
      ]
    },
    {
      type: "input",
      label: "Sales price",
      inputType: "number",
      name: "sales_price",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Sales price is required"
        }
      ]
    },
    {
      type: "input",
      label: "IGST Percentage",
      inputType: "number",
      name: "igst_percentage",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
       
      ]
    },
    {
      type: "input",
      label: "CGST Percentage",
      inputType: "number",
      name: "cgst_percentage",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
      validations: [
       
      ]
    },
    {
      type: "input",
      label: "SGST Percentage",
      inputType: "number",
      name: "sgst_percentage",
      value: (!!this.data.values && !!this.data.values.name) ? this.data.values.name : '',
      classes: "col-lg-3 col-sm-6 col-xs-12",
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


export interface ProductData {
  id: number,
  name: string;
  hsn_sac: string;
  product_code: string;
  stock: number;
  moq: number;
  purchase_price: number;
  sales_price: number;
  igst_percentage: number;
  cgst_percentage: number;
  sgst_percentage: number;
}

export interface ProductInfo {
  name: string;
  id  :  number;
  position: number;
  hsn_sac: string;
  product_code: string;
  stock: number;
  moq: number;
  purchase_price: number;
  sales_price: number;
  igst_percentage: number;
  cgst_percentage: number;
  sgst_percentage: number;
}


let ELEMENT_DATA: ProductInfo[] = [
  {
    "id": 1,
    "position": 1,
    "name": "Product 1",
    "hsn_sac": "3sr3r3",
    "product_code": "PRD0001",
    "stock": 30,
    "moq": 10,
    "purchase_price": 300,
    "sales_price": 400,
    "igst_percentage": 4,
    "cgst_percentage": 2,
    "sgst_percentage": 2,
  },
  {
    "id": 2,
    "position": 2,
    "name": "Product 2",
    "hsn_sac": "3sr3r3",
    "product_code": "PRD0002",
    "stock": 30,
    "moq": 10,
    "purchase_price": 300,
    "sales_price": 400,
    "igst_percentage": 4,
    "cgst_percentage": 2,
    "sgst_percentage": 2,
  },
  {
    "id": 3,
    "position": 3,
    "name": "Product 3",
    "hsn_sac": "3sr3r3",
    "product_code": "PRD0003",
    "stock": 30,
    "moq": 10,
    "purchase_price": 300,
    "sales_price": 400,
    "igst_percentage": 4,
    "cgst_percentage": 2,
    "sgst_percentage": 2,
  },
  {
    "id": 3,
    "position": 3,
    "name": "Product 3",
    "hsn_sac": "3sfd3",
    "product_code": "PRD0003",
    "stock": 30,
    "moq": 10,
    "purchase_price": 300,
    "sales_price": 400,
    "igst_percentage": 4,
    "cgst_percentage": 2,
    "sgst_percentage": 2,
  },
  {
    "id": 4,
    "position": 4,
    "name": "Product 4",
    "hsn_sac": "4d3aq33",
    "product_code": "PRD0004",
    "stock": 30,
    "moq": 10,
    "purchase_price": 300,
    "sales_price": 400,
    "igst_percentage": 4,
    "cgst_percentage": 2,
    "sgst_percentage": 2,
  },
];