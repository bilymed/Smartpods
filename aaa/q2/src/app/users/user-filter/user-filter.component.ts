import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {DepartmentsService} from "../../services/departments.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {MatOptionSelectionChange} from "@angular/material/core";
import {stringify} from "@angular/compiler/src/util";
import {MatRadioChange} from "@angular/material/radio";
import {MatSelect, MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {
  departments$: Observable<string[]>;
  @Output() selectedDepartmentEvent = new EventEmitter<string>();
  @ViewChild('departmentSelect') departmentSelect: ElementRef;
  selectedDepartment: string;
  filterFormGroup = new FormGroup({
    departmentForm: new FormControl(''),
    statusForm: new FormControl('')
  })

  constructor(
    private departmentService: DepartmentsService,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDepartment().subscribe(value => this.filterFormGroup.patchValue({departmentForm: value}))
    this.dataService.getStatus().subscribe(value => this.filterFormGroup.patchValue({statusForm: value}))
    this.departments$ = this.departmentService.getAllDepartments();

  }


  setSelectedDepartment($event: MatSelectChange) {
    this.dataService.setDepartment($event.value);
    this.selectedDepartmentEvent.emit($event.value);
    // this.getSelectedDepartmentEvent.emit(department);
  }

  refresh() {
    this.filterFormGroup.reset()
    // this.selectDepartment.writeValue(null)
  }

  setRadioGroupStatus($event: MatRadioChange) {
    this.dataService.setStatus($event.value)

  }
}
