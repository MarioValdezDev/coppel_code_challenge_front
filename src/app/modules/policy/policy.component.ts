import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { Inventory } from 'src/app/core/models/inventory';
import { Policy } from 'src/app/core/models/policy';
import { PolicyData } from 'src/app/core/models/response/policy_data';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import { PolicyService } from 'src/app/core/services/policy/policy.service';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '@angular/common';
import { PolicyInfoResponse } from 'src/app/core/models/response/policy_info_response';
import { forkJoin } from 'rxjs';
import { UpdatePolicyRequest } from 'src/app/core/models/request/update_policy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  success: boolean = false
  loading: boolean = false
  error: boolean = false
  idEmployee: string = ""
  sku: string = ""
  quantity: Number = 0
  idPolicy: string = ""
  policies: PolicyData[] = []
  employees: Employee[] = []
  inventories: Inventory[] = []
  policy: Policy = {
    idPolicy: '',
    date: '',
    quantity: 0,
    sku: '',
    idEmployee: ''
  }
  policyResponse!: PolicyInfoResponse;
  message: string = ""
  updatePolicyRequest: UpdatePolicyRequest = {
    idPolicy: '',
    articleName: '',
    employeeName: '',
    employeeLastName: ''
  }
  idPolicyUpdated: string = ""
  employeeName: string = ""
  employeeLastName: string = ""
  inventoryName: string = ""

  constructor(
    private service: PolicyService,
    private inventoryService: InventoryService,
    private employeService: EmployeeService,
    private modal: NgbModal
  ) { }


  ngOnInit() {
    this.getAllPolicies();
  }

  getAllPolicies() {
    this.loading = true;
    this.service.getAllPolicies().subscribe((data) => {
      this.policies = data;
      console.log(this.policies)
      this.loading = false;
    }, (error) => { console.log(error) })
  }

  getPolicyById(idPolicy: string) {
    this.service.getAllPolicyById(idPolicy).subscribe((data) => {
      this.policyResponse = data
      console.log(this.policyResponse)
    }, (error) => { console.log(error) })
  }

  getEmployees() {
    this.employeService.getAllEmployees().subscribe((data) => {
      this.employees = data
      console.log(this.employees)
    })
  }

  getInventory() {
    this.inventoryService.getAllInventory().subscribe((data) => {
      this.inventories = data;
      console.log(this.inventories)
    })
  }

  openModal(content: any) {
    this.getInventory();
    this.getEmployees();

    this.modal.open(content, { centered: true });
  }

  savePolicy() {
    this.success = true;
    this.error = false;
    this.policy.idPolicy = uuidv4();
    this.policy.idEmployee = this.idEmployee;
    this.policy.sku = this.sku;
    this.policy.date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.policy.quantity = +this.quantity

    console.log(this.policy)

    this.service.savePolicy(this.policy).subscribe((data) => {
      console.log(data)
      this.showSuccess();
    }, (error) => {
      console.log(error)
      this.message = error.error.data.message;
      this.error = true;
      this.success = false;
    });
  }

  showSuccess() {
    setTimeout(() => {
      this.success = false;
      this.modal.dismissAll();
      this.getAllPolicies();
    }, 2000);
  }

  async openEditPolicyModal(contentPolicy: any, idPolicy: string) {
    console.log(idPolicy);
    this.idPolicy = idPolicy;
    await this.getPolicyById(idPolicy)
    await this.getInventory();
    await this.getEmployees();
    await this.modal.open(contentPolicy, { centered: true });
  }

  openDeletePolicyModal(contentPolicy: any, idPolicy: string) {
    this.modal.open(contentPolicy, { centered: true });
    console.log(idPolicy)
    this.idPolicy = idPolicy;
  }

  updatePolicy() {
    this.success = true;
    this.error = false;
    this.updatePolicyRequest.idPolicy = this.idPolicy;
    this.updatePolicyRequest.articleName = this.inventoryName;
    this.updatePolicyRequest.employeeName = this.employeeName;
    this.updatePolicyRequest.employeeLastName = this.employeeLastName;
    console.log(this.updatePolicyRequest)

    this.service.updatePolice(this.updatePolicyRequest).subscribe((data) => {
      this.showSuccess()
    }, (error: HttpErrorResponse) => {
      this.message = error.error.data.message;
      this.error = true;
      this.success = false;
    })
  }

  deletePolicy() {
    this.success = true;
    this.service.deletePolicy(this.idPolicy).subscribe((data) => {
      this.showSuccess()
    }, (error) => {
      this.message = error.error.data.message;
      this.error = true;
      this.success = false;
    })
  }

}
