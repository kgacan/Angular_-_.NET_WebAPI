import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddDepComponent>, 
              public service: DepartmentService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.reset();
    this.service.formData = {
      DepartmentID:0,
      DepartmentName:''
    }
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');

  }

  onSubmit(form: NgForm){
    this.service.addDeparment(form.value).subscribe(res=>{
      this.resetForm(form);
      this.snackBar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }
}
