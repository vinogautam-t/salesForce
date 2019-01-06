import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  CustomerDataUrl = 'assets/json/customerData.json';

  getCustomerList() {
    return this.http.get(this.CustomerDataUrl);
  }

}
