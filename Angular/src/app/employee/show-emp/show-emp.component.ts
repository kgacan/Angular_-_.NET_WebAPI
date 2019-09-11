import { AddEmpComponent } from './../add-emp/add-emp.component';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../model/employee.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private empService: EmployeeService, private dialog: MatDialog, public snackBar: MatSnackBar) {
    empService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshEmpList();
    })
  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];

  ngOnInit() {
    this.refreshEmpList();
  }

  applyFilter(val: string) {
    this.listData.filter = val.trim().toLocaleLowerCase();
  }

  refreshEmpList() {
    // const dummyData = [{DepartmentID:1, DepartmentName:"IT"},{DepartmentID:2, DepartmentName:"Finance"}];
    // this.listData = new MatTableDataSource(dummyData);
    this.empService.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    })
  }
  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete?')){
      this.empService.deleteEmployee(id).subscribe(res=>{
        this.refreshEmpList();
        this.snackBar.open(res.toString(),'',{
          duration:5000,
          verticalPosition:'top'
        })
      })
    }
  }
  onEdit(emp: Employee){
    this.empService.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);

  }

}
