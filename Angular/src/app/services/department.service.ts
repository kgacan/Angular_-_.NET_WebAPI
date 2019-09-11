
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Department } from './../model/department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  formData: Department;

  constructor(private http:HttpClient) { }

  readonly apiURL = "https://localhost:44305/api";

  getDepList(): Observable<Department[]>{
     return this.http.get<Department[]>(this.apiURL + '/department');
  }

  addDeparment(dep: Department){
    return this.http.post(this.apiURL+ '/department', dep);
  }

  deleteDepartment(id: number){
    return this.http.delete(this.apiURL+'/department/'+id);
  }
  updateDepartment(dep: Department){
    return this.http.put(this.apiURL+'/department', dep);
  }


  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
   
}
