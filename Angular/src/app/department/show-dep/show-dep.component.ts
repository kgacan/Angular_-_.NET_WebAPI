import { AddDepComponent } from './../add-dep/add-dep.component';
import { DepartmentService } from './../../services/department.service';
import { Department } from './../../model/department-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private depService: DepartmentService, private dialog: MatDialog, public snackBar: MatSnackBar) { 
    depService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshDepList();
    })

  }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  ngOnInit() {
    this.refreshDepList();
  }

  refreshDepList(){
        // const dummyData = [{DepartmentID:1, DepartmentName:"IT"},{DepartmentID:2, DepartmentName:"Finance"}];
    // this.listData = new MatTableDataSource(dummyData);
    this.depService.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
  })
  }
  onEdit(dep: Department){
    console.log(dep);
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete?')){
      this.depService.deleteDepartment(id).subscribe(res=>{
        this.refreshDepList();
        this.snackBar.open(res.toString(),'',{
          duration:5000,
          verticalPosition:'top'
        })
      })
    }
  }

  applyFilter(val: string){
    this.listData.filter = val.trim().toLocaleLowerCase();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }
}
