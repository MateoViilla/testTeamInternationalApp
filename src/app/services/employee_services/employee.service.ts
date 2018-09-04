import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = 'http://localhost:3003/api/employee';

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    console.log(emp)
    return this.http.post(this.baseURL + '/n', emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL+ 's');
  }

  putEmployee(emp: Employee) {
    
    return this.http.post(this.baseURL + '/u', emp); 
  }

  deleteEmployee(_id: string) {
    let body = {
      _id : _id
    }
    return this.http.post(this.baseURL + '/d', body);
  }

}
