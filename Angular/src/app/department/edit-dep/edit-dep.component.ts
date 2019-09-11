import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<EditDepComponent>, 
    public service: DepartmentService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');

  }
  onSubmit(form: NgForm){
    this.service.updateDepartment(form.value).subscribe(res=>{
      this.snackBar.open(res.toString(),'',{
        duration:5000,
        verticalPosition:'top'
      })
    })
  }

}
