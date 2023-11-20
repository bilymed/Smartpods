import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  Input,
  ElementRef,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/User";
import {UsersService} from "../services/users.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ToggleService} from "../services/toggle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {fromEvent, merge, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {Pagination} from "../models/Pagination";
import {DepartmentsService} from "../services/departments.service";
import {MatSelect} from "@angular/material/select";
import {FormControl, FormControlName, FormGroup} from "@angular/forms";
import {UserFilterComponent} from "./user-filter/user-filter.component";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Output() toggleEventEmitter = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  departments$: Observable<string[]>;
  @Input() selectedDepartment: string;
  @ViewChild(UserFilterComponent) userFilterComponent: ComponentRef<UserFilterComponent>
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns: string[] = [];
  displayedColumnsMap = new Map([
    ['id', false],
    ['email', true],
    ['name', true],
    ['role', false],
    ['status', false],
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

  ngOnInit(): void {
    this.departments$ = this.departmentService.getAllDepartments();

    this.displayedColumnsMap.forEach((key, value) => {
        key && this.displayedColumns.push(value)
      }
    )
  }



  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.userFilterComponent.instance.selectedDepartmentEvent.subscribe(
      value => console.log("Parent:" +value)
    )
  }


  ngAfterViewInit() {
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

  test(){
    this.userFilterComponent.instance.selectedDepartmentEvent.subscribe(
      value => console.log("Parent:" +value)
    )
  }

  findUsers(): Observable<Pagination<User>> {
    const keyUp = fromEvent<any>(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      )
    return merge(keyUp, this.sort.sortChange, this.paginator.page)
      .pipe(
        // map(event => event.target.value),


        switchMap(search => {
          this.isLoadingResults = true;
          return this.loadUsers(
            this.inputSearch.nativeElement.value,
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
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10):
    Observable<Pagination<User>> {
    return this.userService.getUsers(name, sortOrder, pageNumber, pageSize).pipe(
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

  getSelectedDepartment(department: string) {
    this.selectedDepartment = department;
  }

  refresh() {
    this.filterFormGroup.reset();
    // this.userFilterComponent.filterFormGroup.reset()
    // this.selectDepartment.writeValue(null)
  }

  toggleFilterComponent() {
    this.userFilterComponent = this.toggleService.toggleComponent(UserFilterComponent);
    fromEvent(this.userFilterComponent.instance.departmentSelect.nativeElement, 'onSelectionChange').pipe(
      tap(console.log)
    )
  }
}
