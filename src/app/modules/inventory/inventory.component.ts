import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from 'src/app/core/models/inventory';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpErrorResponse } from '@angular/common/http'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  inventories: Inventory[] = []
  inventory: Inventory = {
    sku: '',
    name: '',
    quantity: 0
  }
  success: boolean = false
  loading: boolean = false
  error: boolean = false
  message: string = ""
  name: string = ""
  quantity: Number = 0

  constructor(private service: InventoryService, private modal: NgbModal) { }

  ngOnInit() {
    this.getInventory()
  }

  getInventory() {
    this.loading = true;
    this.service.getAllInventory().subscribe((data) => {
      this.inventories = data;
      this.loading = false;
    })
  }

  openModal(contenido: any) {
    this.modal.open(contenido, { centered: true });
  }

  saveInventory() {
    this.success = true;
    this.inventory.sku = uuidv4();
    this.inventory.name = this.name;
    this.inventory.quantity = +this.quantity;
    console.log(this.inventory)
    this.service.saveInventory(this.inventory).subscribe((res) => {
      console.log(res)
      this.showSuccess();
    }, (error: HttpErrorResponse) => {
      console.log(error)
      this.error = true;
      this.success = false;
      this.message = error.error.data.message;
    });
  }

  showSuccess() {
    setTimeout(() => {
      this.success = false;
      this.modal.dismissAll();
      this.getInventory();
    }, 2000);
  }

}
