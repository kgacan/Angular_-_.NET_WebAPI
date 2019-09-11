import { EmployeeService } from './services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { EditEmpComponent } from './employee/edit-emp/edit-emp.component';
import { AddEmpComponent } from './employee/add-emp/add-emp.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';
import { DepartmentService } from './services/department.service';
import { MatButtonModule, MatIconModule, MatTableModule, MatSortModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ShowEmpComponent,
    EditEmpComponent,
    AddEmpComponent,
    DepartmentComponent,
    ShowDepComponent,
    EditDepComponent,
    AddDepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DepartmentService, EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [AddDepComponent, EditDepComponent]
})
export class AppModule { }
