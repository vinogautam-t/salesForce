import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule 
  } from "@angular/material";
  

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule 
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule 
  ]
})
export class MaterialModule { }
