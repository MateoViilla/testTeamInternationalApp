import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee_services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../services/employee_services/employee';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
declare var M: any;

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [EmployeeService]
})

export class ListaComponent implements OnInit {
  dataSource = new MatTableDataSource(this.employeeService.employees);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService) { 
      sessionStorage.clear();
    }

  displayedColumns: string[] = ['name', 'age', 'userName', 'hireDate', 'options'];

  ngOnInit() {
    this.reloadList();
    this.calculateAge("02/02/1997");

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadList() {
    this.employeeService.getEmployeeList().subscribe((res) => {

      let body: any;
      body = res as Employee[];
      this.employeeService.employees = body.employees;

      this.dataSource = new MatTableDataSource(this.employeeService.employees);


    });
  }

  calculateAge(birthdate) {
    let date = new Date(birthdate);
    let ageDifMs = Date.now() - date.getTime();
    let ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age;
  }

  onSave() {
    sessionStorage.setItem("action", "save");
    this.router.navigate(['employee/newuser']);
  }

  onEdit(emp: Employee) {
    sessionStorage.setItem("employee",JSON.stringify(emp))
    sessionStorage.setItem("action", "edit");
    this.router.navigate(['employee/edit']);
  }

  onView(emp: Employee) {
    sessionStorage.setItem("employee",JSON.stringify(emp))
    sessionStorage.setItem("action", "view");
    this.router.navigate(['employee/view']);
  }

  onDelete(_id: string) {

    console.log(_id)
    this.employeeService.deleteEmployee(_id).subscribe((res) => {
      let body: any;
      body = res;
      if (body.OK == 1) {
        this.showSuccess(body.message, null);

      }
      if (body.OK == 0) {
        this.showSuccess(body.message, null);
      }
      console.log(body)
    });
    this.reloadList();
  }


  showSuccess(message: string, employee: Employee) {
    this.toastr.success(message);
  }
}



