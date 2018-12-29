import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FieldConfig, ItemForm } from "../../field.interface";
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import {CustomerInputComponent} from '../../components/customer-input/customer-input.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

export class SalesComponent implements OnInit {

  itemInfo: ItemForm = {'title': "Item Info", 'type': "item"};

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
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
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: "select",
      label: "Country",
      name: "country",
      value: "UK",
      options: ["India", "UAE", "UK", "US"]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    {
      type: "button",
      label: "Save"
    }
  ];

  itemForm: FormGroup;
  formErrors = {
    name: '',
    username: '',
    addresses: [
      { city: '', country: '' }
    ]
  };
  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be 3 characters.',
      maxlength: 'Name can\'t be longer than 6 characters.'
    },
    username: {
      required: 'Username is required.',
      minlength: 'Username must be 3 characters.'
    },
    addresses: {
      city: {
        required: 'City is required.',
        minlength: 'City must be 3 characters.'
      },
      country: {
        required: 'Country is required.'
      }
    }
  };

  constructor(private fb: FormBuilder) {}

  
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    // build our form
    this.itemForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
      username: ['', Validators.minLength(3)],
      addresses: this.fb.array([
        this.createAddress()
      ])
    });

    // watch for changes and validate
    this.itemForm.valueChanges.subscribe(data => this.validateForm());
  }

  validateForm() {
    for (let field in this.formErrors) {
      // clear that input field errors
      this.formErrors[field] = '';

      // grab an input field by name
      let input = this.form.get(field);

      if (input.invalid && input.dirty) {
        // figure out the type of error
        // loop over the formErrors field names
        for (let error in input.errors) {
          // assign that type of error message to a variable
          this.formErrors[field] = this.validationMessages[field][error];
        }
      }
    }

    this.validateAddresses();
  }

  validateAddresses() {
    // grab the addresses formarray
    let addresses = <FormArray>this.form.get('addresses');

    // clear the form errors
    this.formErrors.addresses = [];

    // loop through however many formgroups are in the formarray
    let n = 1;
    while (n <= addresses.length) {

      // add the clear errors back
      this.formErrors.addresses.push({ city: '', country: '' });

      // grab the specific group (address)
      let address = <FormGroup>addresses.at(n - 1);

      // validate that specific group. loop through the groups controls
      for (let field in address.controls) {
        // get the formcontrol
        let input = address.get(field);

        // do the validation and save errors to formerrors if necessary 
        if (input.invalid && input.dirty) {
          for (let error in input.errors) {
            this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];
          }
        }
      }

      n++;
    }
  }

  createAddress() {
    return this.fb.group({
      city: ['', Validators.minLength(3)],
      country: ['']
    });
  }

  addAddress() {
    let addresses = <FormArray>this.form.get('addresses');
    addresses.push(this.createAddress());
  }

  removeAddress(i) {
    let addresses = <FormArray>this.form.get('addresses');
    addresses.removeAt(i);
  }

  processForm() {
    console.log('processing', this.form.value);
  }

  submit(value: any) {}

}
