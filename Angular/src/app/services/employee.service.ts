
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Employee } from './../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;

  constructor(private http:HttpClient) { }

  readonly apiURL = "https://localhost:44305/api";

  getEmpList(): Observable<Employee[]>{
     return this.http.get<Employee[]>(this.apiURL + '/employee');
  }

  addEmployee(emp: Employee){
    return this.http.post(this.apiURL+ '/employee', emp);
  }

  deleteEmployee(id: number){
    return this.http.delete(this.apiURL+'/employee/'+id);
  }
  updateEmployee(emp: Employee){
    return this.http.put(this.apiURL+'/employee', emp);
  }

  getDropDownValues():Observable<any>{
    return this.http.get(this.apiURL+'/department');
  }


  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
   
}
