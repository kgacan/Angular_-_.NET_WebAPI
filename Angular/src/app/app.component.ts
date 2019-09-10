import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDepartmentActive = false;
  isEmployeeActive = false;

  onShowDepartment(){
    this.isDepartmentActive = true;
    this.isEmployeeActive = false;
  }

  onShowEmployee(){
    this.isDepartmentActive = false;
    this.isEmployeeActive = true;
  }
}
