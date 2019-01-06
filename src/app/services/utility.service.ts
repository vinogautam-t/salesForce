import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  stateDataUrl = 'assets/json/stateAndCity.json';
  private customerNames = new Subject<any>();

  constructor(private http: HttpClient) { }

  getCustomerNameInfo(): Observable<any> {
    return this.customerNames.asObservable();
  }

  sendCustomerNameInfo(message) {
      this.customerNames.next(message);
  }

  getState(){
    return this.http.get(this.stateDataUrl);
  }

  test(){
    return "asd";
  }

}
