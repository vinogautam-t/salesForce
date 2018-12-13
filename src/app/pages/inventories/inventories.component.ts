import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.scss']
})
export class InventoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
