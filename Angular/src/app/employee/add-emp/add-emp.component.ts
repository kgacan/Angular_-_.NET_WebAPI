import { Department } from './../../model/department-model';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  listItems: Array<string> = [];

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>, 
              public service: EmployeeService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
    this.dropdownRefresh();
  }

  dropdownRefresh(){
    this.service.getDropDownValues().subscribe(data=>{
      data.forEach(element => {
        this.listItems.push(element["DepartmentName"]);
      });
    })
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.reset();
    this.service.formData = {
      EmployeeID:0,
      EmployeeName:'',
      Department:'',
      MailID:'',
      DOJ:null
    }
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');

  }

  onSubmit(form: NgForm){
    this.service.addEmployee(form.value).subscribe(res=>{
      this.resetForm(form);
      this.snackBar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }
}

