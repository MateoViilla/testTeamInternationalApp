import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../services/employee_services/employee.service';
import { Employee } from '../services/employee_services/employee';
import { CountriesService } from '../services/country_services/countries.service';
import { Country } from '../services/country_services/country';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [EmployeeService,
    CountriesService]
})
export class ListComponent implements OnInit {
  

  constructor(private employeeService: EmployeeService,
    private countryService: CountriesService,
    private router: Router) { 

      sessionStorage.clear();
    }

  ngOnInit() {
    this.reloadList();
    this.calculateAge("02/02/1997");
    this.loadCountries();
  }


  reloadList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      let body : any;
      body  = res as Employee[];
      this.employeeService.employees = body.employees;

    });
  }

  calculateAge(birthdate) {
    let date = new Date(birthdate);
    let ageDifMs = Date.now() - date.getTime();
    let ageDate = new Date(ageDifMs); 
    let age =  Math.abs(ageDate.getUTCFullYear() - 1970);
   
    return age;

  }

  loadCountries() {
    this.countryService.getCountryList().subscribe((res) => {
      let body : any;
      body  = res as Country[];
      this.countryService.countries = body;
      console.log(body[0].name)
    });
  }

  onEdit(employee){
    sessionStorage.setItem("employee", JSON.stringify(employee));
    sessionStorage.setItem("action", "edit");
    this.router.navigate(['employee']);

  }

  onDelete(id){
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      console.log(res)
        let body: any;
        body = res;
        if (body.OK == 1) {
          M.toast({ html: "User deleted successfully ", classes: 'rounded' });

        }
        if (body.OK == 0) {
          M.toast({ html: body.message, classes: 'rounded' });
        }
    })
    this.reloadList();

  }

  onView(){
    sessionStorage.setItem("action", "view");
    this.router.navigate(['employee']);
  }

  onSave(){
    sessionStorage.setItem("action", "save");
    this.router.navigate(['employee']);
  }

}
