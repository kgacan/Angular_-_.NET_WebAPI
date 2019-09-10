import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor() { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];

  ngOnInit() {
  }

}
