import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { DateComponent } from './components/date/date.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SalesComponent } from './pages/sales/sales.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerAddModule } from './pages/customers/customers.component';
import { AddCustomerComponent } from './pages/customers/add-customer/add-customer.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { InventoriesComponent } from './pages/inventories/inventories.component';

import { ApiService } from './services/api/api.service';
import { CustomerInputComponent } from './components/customer-input/customer-input.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DashboardComponent,
    SalesComponent,
    CustomersComponent,
    AddCustomerComponent,
    CustomerAddModule,
    TextareaComponent,
    InventoriesComponent,
    CustomerInputComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    AutocompleteComponent,
    CustomerAddModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
