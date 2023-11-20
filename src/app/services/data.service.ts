import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataService {

  private departmentSubject$ = new BehaviorSubject<string>(null);
  private statusSubject$ = new BehaviorSubject<boolean>(null);

  setStatus(status: boolean){
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

  reset(){
    this.departmentSubject$.next(null);
    this.statusSubject$.next(null);
  }
}
