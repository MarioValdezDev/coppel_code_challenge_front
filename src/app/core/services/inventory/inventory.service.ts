import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Inventory } from '../../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${btoa(environment.user+':'+environment.password)}`
  });

  constructor(private http: HttpClient) { }


  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(environment.baseURL + 'inventory',{headers:this.headers})
  }

  saveInventory(inventory:Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(environment.baseURL + 'inventory',inventory,{headers:this.headers})
  }

}
