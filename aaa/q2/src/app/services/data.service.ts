import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataService {

  private departmentSubject$ = new BehaviorSubject<string>('');
  private statusSubject$ = new BehaviorSubject<number>(0);

  setStatus(status: number){
    this.statusSubject$.next(status);
  }

  getStatus(){
    return this.statusSubject$.asObservable();
  }

  setDepartment(department: string) {
    this.departmentSubject$.next(department);
  }

  getDepartment() {
    return this.departmentSubject$.asObservable();
  }
}
