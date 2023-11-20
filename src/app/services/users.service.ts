import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {User} from "../models/User";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Pagination} from "../models/Pagination";

@Injectable()
export class UsersService {

  private usersUrl = 'http://localhost:9000/api/users';
  private usersUrlFilter = 'http://localhost:9000/api/usersByFilter';

  constructor(private http: HttpClient) {
  }

  public getUsers(name: string,
                  department: string,
                  status: string,
                  sortOrder: string,
                  pageNumber: number,
                  pageSize: number) {
    const options = {
      params: new HttpParams()
        .set('name', name)
        .set('department', department)
        .set('status', status)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
    }
    return this.http.get<Pagination<User>>(this.usersUrl, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }

  public getUsersByFilter(filter: any,
                  sortOrder: string,
                  pageNumber: number,
                  pageSize: number) {
    const options = {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
    }
    return this.http.get<Pagination<User>>(this.usersUrlFilter, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }

  public getAllUsers() {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  public findById(id: string) {
    return this.http.get<User>(`${this.usersUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error)
        })
      );
  }

  public findByEmail(email: string) {
    return this.http.get<User>(`${this.usersUrl}/${email}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error)
        })
      );
  }
}
