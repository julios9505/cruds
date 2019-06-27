import { Component, OnInit } from '@angular/core';

import {EmployeeService} from '../../services/employee.service';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(res=>{
        this.resetForm(form);
        M.toast({html: '¡El registro se actualizo exitosamente!'});
        this.getEmployees();
      });   
    }else{
      this.employeeService.postEmployee(form.value)
    .subscribe(res=>{
      this.resetForm(form);
      M.toast({html: 'Registro éxitoso!'});
      this.getEmployees();
    });
  }
}
    

  getEmployees(){
    this.employeeService.getEmployees()
    .subscribe(res=>{
      this.employeeService.employees = res as Employee[];
      console.log(res);
    });
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string){
    if(confirm('¿Estás seguro de que quieres eliminar el registro?')){
      this.employeeService.deleteEmployee(_id)
    .subscribe(res=>{
      this.getEmployees();
      M.toast({html: 'Registro eliminado'});
    });
     
    }
    
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
