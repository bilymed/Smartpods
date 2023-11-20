import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/User";
import {fromEvent, merge, Observable, Subject} from "rxjs";
import {UserFilterComponent} from "../users/user-filter/user-filter.component";
import {FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ToggleService} from "../services/toggle.service";
import {DepartmentsService} from "../services/departments.service";
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {Pagination} from "../models/Pagination";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatSelectChange} from "@angular/material/select";
import {MatRadioChange} from "@angular/material/radio";
import {DevicesService} from "../services/devices.service";
import {Device} from "../models/Device";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') inputSearch: ElementRef;
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>();
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
    ['Id', false],
    ['SerialNumber', true],
    ['EnrollmentDate', true],
    ['ModelNumber', false],
    ['DeviceType', false],
    ['Status', false],
    ['Country', false],
    ['TimeZone', false],
    ['Ownership', true],
    ['CompanyName', true],
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
    private dataService: DataService,
    private devicesService: DevicesService) {
  }

  ngAfterViewInit() {
    this.departments$ = this.departmentService.getAllDepartments();
    this.displayedColumnsMap.forEach((key, value) => {
        key && this.displayedColumns.push(value)
      }
    )

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.findDevices()
      .subscribe(result => {
          this.dataSource.data = result.data;
          this.resultsLength = result.count
        }
      );
  }

  ngOnDestroy() {
    this.toggleService.close();
  }

  findDevices(): Observable<Pagination<Device>> {
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
          return this.loadDevices(
            this.inputSearch.nativeElement.value || 0,
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

  loadDevices(
    serial = 0,
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10):
    Observable<Pagination<Device>> {
    return this.devicesService.getDevices(serial, sortOrder, pageNumber, pageSize).pipe(
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
    this.findDevices() .subscribe(result => {
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

  // setSelectedDepartment($event: MatSelectChange) {
  //   this.dataService.setDepartment($event.value);
  //   this.findUsers($event.value, this.filterFormGroup.value.statusForm).subscribe(result => {
  //       this.dataSource.data = result.data;
  //       this.resultsLength = result.count
  //     }
  //   );
  // }
  //
  // setRadioGroupStatus($event: MatRadioChange) {
  //   this.departmentSelect = (this.departmentSelect != undefined || null) ? this.departmentSelect : '';
  //   this.dataService.setStatus($event.value)
  //   console.log('select', this.departmentSelect)
  //   console.log('radio', $event.value)
  //
  //   this.findDevices(this.filterFormGroup.value.departmentForm, $event.value).subscribe(result => {
  //       this.dataSource.data = result.data;
  //       this.resultsLength = result.count
  //     }
  //   );
  // }

  filterUsers() {

  }

  resetForm() {
    this.filterFormGroup.reset();
    this.dataService.reset();
  }
}
