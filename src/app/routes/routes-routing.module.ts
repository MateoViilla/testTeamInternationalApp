import { NgModule } from '@angular/core';
import { Routes, RouterModule, ROUTER_CONFIGURATION } from '@angular/router';
import { EmployesAdminComponent } from '../employes-admin/employes-admin.component';
import { ListaComponent } from '../lista/lista.component';

import { EmployeeComponent} from '../employee/employee.component';
import { ListComponent} from '../list/list.component';



const routes: Routes = [
  
  {
    path:'employee', component:EmployesAdminComponent, children:[
      {
        path:'newuser', component:EmployeeComponent
      },
      {
        path:'view', component:EmployeeComponent
      },
      {
        path:'edit', component:EmployeeComponent
      },
      {
        path:'list', component:ListaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
