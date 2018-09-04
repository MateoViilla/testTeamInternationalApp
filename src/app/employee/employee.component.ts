import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { DOCUMENT } from '@angular/platform-browser';

import { EmployeeService } from '../services/employee_services/employee.service';
import { Employee } from '../services/employee_services/employee';
import { CountriesService } from '../services/country_services/countries.service';
import { Router } from '@angular/router';
import { JobTitleComponent } from './job-title/job-title.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService,
    CountriesService],
})
export class EmployeeComponent implements OnInit {



  action: String;
  employee: Employee = new Employee();
  title: String;
  area: String;
  countryForm: FormGroup;
  countries = [];
  jobs = [];
  employeeForm: FormGroup;
  show: boolean = true;

  constructor(private employeeService: EmployeeService,
    private countryService: CountriesService,
    private router: Router,
    private fb: FormBuilder,
    public formBuilder: FormBuilder,
    private toastr: ToastrService) {


    if (sessionStorage.getItem('employee')) {
      this.employee = JSON.parse(sessionStorage.getItem('employee'));
    }
    this.countryForm = this.fb.group({ countryControl: [this.countries[1]] });
    this.action = sessionStorage.getItem('action');
    this.loadCountries();
  }

  ngOnInit() {

    switch (this.action) {
      case "view":
        this.title = "Viewing: " + this.employee.name;
        this.removeElement("divName");
        this.disableEmployeeForm(true);
        this.removeElement("submitButton");
        break;
      case "edit":
        this.title = "Editing: " + this.employee.name;
        this.removeElement("divName");
        this.disableEmployeeForm(false);
        break;
      case "save":
        this.title = "New employee: ";
        this.disableEmployeeForm(false);
        this.resetForm();
        break;
      default:
        break;
    }

    this.loadCountries();
  }

  removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  }
  resetForm() {

    this.employee = {
      _id: "",
      name: "",
      dod: "",
      country: "",
      userName: "",
      hireDate: "",
      status: false,
      area: "",
      jobTitle: "",
      tipRote: 0,
    }
  }



  onSubmit() {
    console.log();

    if (this.employeeForm.get("area").invalid) {
      this.toastr.error("Select area");
    }
    if (!this.employeeForm.invalid) {
      
      if (this.calculateAge(this.employee.dod) > 18) {
        if (!this.employee._id) {
          let user = new Employee();
          user = this.employee;
          this.employeeService.postEmployee(user).subscribe((res) => {
            let body: any;
            body = res;
            if (body.OK == 1) this.showSuccess(body.message, this.employee);
            if (body.OK == 0) this.showSuccess(body.message, this.employee);
          });
        }
        if (this.employee._id) {
          this.employeeService.putEmployee(this.employee).subscribe((res) => {
            let body: any;
            body = res;
            if (body.OK == 1) this.showSuccess(body.message, this.employee);

            if (body.OK == 0) this.showSuccess(body.message, this.employee);

          });
        }
        this.router.navigate(['employee/list']);


      }
      else this.toastr.error("Min age 18");
    }
    
    else this.toastr.error("Invalid form");
  }

  onBack() {
    this.router.navigate(['employee/list']);
  }

  onEdit(emp: Employee) {
    this.employee = emp;
  }

  loadCountries() {
    this.countryService.getCountryList().subscribe((res) => {
      let body: any;
      body = res as String[];
      this.countryService.countries = body;


    });
  }
  setArea(area: String) {
    this.area = area;
    this.employee.area = area;
    if (area == 'Services') {
      this.jobs = [
        { title: 'Manager' },
        { title: 'Tuttofare' },
        { title: 'Waitress' },
        { title: 'Dinning room manager' },
      ];
    } else {
      this.jobs = [
        { title: 'Chef' },
        { title: 'Sous Chef' },
        { title: 'Dishwasher' },
        { title: 'Cook' },
      ];
    }
  }


  private disableEmployeeForm(param: boolean) {
    this.employeeForm = new FormGroup({
      name: new FormControl({ value: '', disabled: param }, [Validators.required]),
      dod: new FormControl({ value: '', disabled: param }, [Validators.required]),
      country: new FormControl({ value: '', disabled: param }, [Validators.required]),
      userName: new FormControl({ value: '', disabled: param }, [Validators.required]),
      hireDate: new FormControl({ value: '', disabled: param }, [Validators.required]),
      area: new FormControl({ value: '', disabled: param }, [Validators.required]),
      jobTitle: new FormControl({ value: '', disabled: param }, [Validators.required]),
      tipRote: new FormControl({ value: '', disabled: param }),
      status: new FormControl({ value: '', disabled: param }, [Validators.required]),
      submit: new FormControl({})

    });
  }

  enableTip() {

    if (this.employee.jobTitle != "Waitress" && this.employee.jobTitle != "Dinning room manager") {
      this.employeeForm.get("tipRote").setValue(0);
      this.employeeForm.get("tipRote").disable();

    }
    else
      this.employeeForm.get("tipRote").enable()
  }

  showSuccess(message: string, employee: Employee) {
    this.toastr.success(message);
  }

  calculateAge(birthdate) {
    let date = new Date(birthdate);
    let ageDifMs = Date.now() - date.getTime();
    let ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age;
  }
}
