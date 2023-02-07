import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Policy } from '../../models/policy';
import { UpdatePolicyRequest } from '../../models/request/update_policy';
import { PolicyData } from '../../models/response/policy_data';
import { PolicyInfoResponse } from '../../models/response/policy_info_response';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${btoa(environment.user + ':' + environment.password)}`
  });

  constructor(private http: HttpClient) { }

  getAllPolicies(): Observable<PolicyData[]> {
    return this.http.get<PolicyData[]>(environment.baseURL + 'policy', { headers: this.headers })
  }

  getAllPolicyById(idPolicy: string): Observable<PolicyInfoResponse> {
    return this.http.get<PolicyInfoResponse>(environment.baseURL + 'policy/' + idPolicy, { headers: this.headers })
  }

  savePolicy(policy: Policy): Observable<any> {
    return this.http.post<any>(environment.baseURL + 'policy', policy, { headers: this.headers })
  }

  deletePolicy(policy: string): Observable<any> {
    return this.http.delete<any>(environment.baseURL + 'policy/' + policy, { headers: this.headers })
  }

  updatePolice(request: UpdatePolicyRequest): Observable<any> {
    return this.http.patch<any>(environment.baseURL + 'policy',request, { headers: this.headers })
  }
}
