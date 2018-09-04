import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employes-admin',
  template:'<router-outlet></router-outlet>'
})
export class EmployesAdminComponent implements OnInit {

  constructor(private router:Router) {
    this.router.navigate(['employee/list']);
   }

  ngOnInit() {
  }

}
