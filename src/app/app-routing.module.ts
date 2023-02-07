import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { PolicyComponent } from './modules/policy/policy.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'employee', component: EmployeeComponent},
  { path:'inventory', component: InventoryComponent},
  { path:'policy', component: PolicyComponent},
  { path:'',redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
