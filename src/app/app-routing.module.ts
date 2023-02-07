import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { EmployeeComponent } from './modules/employee/employee.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'employee', component: EmployeeComponent},
  { path:'',redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
