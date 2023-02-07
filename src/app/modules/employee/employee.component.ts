import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { HttpErrorResponse} from '@angular/common/http'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  name: string = ''
  lastName: string = ''
  occupation: string = ''
  employees: Employee[] = []
  employee: Employee = {
    idEmployee: '',
    name: '',
    lastName: '',
    occupation: ''
  }
  success: boolean = false
  loading: boolean = false
  error: boolean = false
  message: string = ""

  constructor(private service: EmployeeService, private modal: NgbModal, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true
    this.service.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data
      this.loading = false
    });
  }
  openCentrado(contenido: any) {
    this.modal.open(contenido, { centered: true });
  }

  saveEmployee() {
    this.success = true;
    this.error = false;
    this.employee.idEmployee = uuidv4();
    this.employee.name = this.name
    this.employee.lastName = this.lastName
    this.employee.occupation = this.occupation

    this.service.saveEmployee(this.employee).subscribe((res) => {
      this.showSuccess();
    },(error:HttpErrorResponse)=>{
      console.log(error)
      this.error = true;
      this.success = false;
      this.message = error.error.data.message
    })
  }

  showSuccess() {

    setTimeout(() => {
      this.success = false
      this.modal.dismissAll();
      this.getEmployees()
    }, 2000)

  }

}
