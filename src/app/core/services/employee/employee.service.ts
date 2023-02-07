import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${btoa(environment.user+':'+environment.password)}`
  });

  constructor(private http: HttpClient) { }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(environment.baseURL+'employee',{headers:this.headers})
  }
  
  saveEmployee(employee:Employee):Observable<any>{
    return this.http.post(environment.baseURL+'employee',employee,{headers:this.headers})
  }
}
