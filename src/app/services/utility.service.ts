import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private customerNames = new Subject<any>();

  constructor() { }

  getCustomerNameInfo(): Observable<any> {
    return this.customerNames.asObservable();
  }

  sendCustomerNameInfo(message) {
      this.customerNames.next(message);
  }

  test(){
    return "asd";
  }

}
