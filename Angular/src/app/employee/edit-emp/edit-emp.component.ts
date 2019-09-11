import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  listItems: Array<string> = [];

  constructor(public dialogbox: MatDialogRef<EditEmpComponent>,
    public service: EmployeeService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dropdownRefresh();
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');

  }
  onSubmit(form: NgForm) {
    this.service.updateEmployee(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), '', {
        duration: 5000,
        verticalPosition: 'top'
      })
    })
  }
  dropdownRefresh(){
    this.service.getDropDownValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      });
    })
  }
}
