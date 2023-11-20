import {
  AfterViewInit,
  Component,
  OnInit,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef, OnChanges, SimpleChanges, Output,
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/User";
import {UsersService} from "../services/users.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ToggleService} from "../services/toggle.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {combineLatest, forkJoin, fromEvent, merge, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {Pagination} from "../models/Pagination";
import {DepartmentsService} from "../services/departments.service";
import {FormControl, FormControlName, FormGroup} from "@angular/forms";
import {UserFilterComponent} from "./user-filter/user-filter.component";
import {DataService} from "../services/data.service";
import {MatRadioChange} from "@angular/material/radio";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  departments$: Observable<string[]>;
  userFilterComponent: ComponentRef<UserFilterComponent>;
  // @ViewChild('departmentSelect') departmentSelect: ElementRef;
  departmentSelect: string
  statusRadioGroup: boolean
  // @ViewChild('statusRadioGroup') statusRadioGroup: ElementRef;
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns: string[] = [];
  displayedColumnsMap = new Map([
    ['id', false],
    ['email', true],
    ['name', true],
    ['role', false],
    ['status', true],
    ['usertype', false],
    ['verified', false],
    ['locked', false],
    ['department', true],
  ]);
  public subject = new Subject<any>();
  filterFormGroup = new FormGroup({
    departmentForm: new FormControl(''),
    statusForm: new FormControl('')
  })

  constructor(
    private userService: UsersService,
    public toggleService: ToggleService,
    private departmentService: DepartmentsService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private dataService: DataService) {
  }

  ngAfterViewInit() {
    this.departments$ = this.departmentService.getAllDepartments();
    this.displayedColumnsMap.forEach((key, value) => {
        key && this.displayedColumns.push(value)
      }
    )

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.findUsers()
      .subscribe(result => {
          this.dataSource.data = result.data;
          this.resultsLength = result.count
        }
      );
  }

  ngOnDestroy() {
    this.toggleService.close();
  }

  findUsers(selectedDepartment = '', checkedStatus = ''): Observable<Pagination<User>> {
    const keyUp = fromEvent<any>(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      )
    return merge(
      keyUp,
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(
        switchMap(search => {
          this.isLoadingResults = true;
          return this.loadUsers(
            this.inputSearch.nativeElement.value,
            selectedDepartment,
            checkedStatus,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          this.isLoadingResults = false;
          return data
        })
      )
  }

  loadUsers(
    name = '',
    department = '',
    status = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10):
    Observable<Pagination<User>> {
    return this.userService.getUsers(name, department, status, sortOrder, pageNumber, pageSize).pipe(
      map(result => result)
    );
  }

  showHideColumns(event: MatCheckboxChange) {
    this.displayedColumnsMap.set(event.source.name, event.source.checked)
    const columns: string[] = [];
    this.displayedColumnsMap.forEach((key, value) => {
        !key || columns.push(value)
      }
    )
    this.displayedColumns = columns
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  getUser(id: string) {
    this.router.navigate(['users', id])
  }

  refresh() {
    this.filterFormGroup.reset();
    this.findUsers() .subscribe(result => {
        this.dataSource.data = result.data;
        this.resultsLength = result.count
      }
    );
    // this.userFilterComponent.instance.filterFormGroup.reset();
    // this.dataService.reset();
  }

  toggleFilterComponent() {
    this.userFilterComponent = this.toggleService.toggleComponent(UserFilterComponent);
  }

  setSelectedDepartment($event: MatSelectChange) {
    this.dataService.setDepartment($event.value);
    this.findUsers($event.value, this.filterFormGroup.value.statusForm).subscribe(result => {
        this.dataSource.data = result.data;
        this.resultsLength = result.count
      }
    );
  }

  setRadioGroupStatus($event: MatRadioChange) {
    this.departmentSelect = (this.departmentSelect != undefined || null) ? this.departmentSelect : '';
    this.dataService.setStatus($event.value)
    console.log('select', this.departmentSelect)
    console.log('radio', $event.value)

    this.findUsers(this.filterFormGroup.value.departmentForm, $event.value).subscribe(result => {
        this.dataSource.data = result.data;
        this.resultsLength = result.count
      }
    );
  }

  filterUsers() {

  }

  resetForm() {
    this.filterFormGroup.reset();
    this.dataService.reset();
  }
}
