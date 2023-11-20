import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class DepartmentsService {

  private departmentsUrl = 'http://localhost:9000/api/departments';

  constructor(private http: HttpClient) {
  }

  public getAllDepartments(): Observable<string[]>{
    return this.http.get<string[]>(this.departmentsUrl);
  }

}
