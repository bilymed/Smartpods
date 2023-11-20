import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Pagination } from "../models/Pagination";
import { Device } from "../models/Device";

@Injectable()
export class DevicesService {

  private devicesUrl = 'http://localhost:9000/api/devices';

  constructor(private http: HttpClient) {
  }

  public getDevices(serial: number,
    sortOrder: string,
    pageNumber: number,
    pageSize: number) {
    const options = {
      params: new HttpParams()
        .set('serial', serial)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber)
        .set('pageSize', pageSize)
    }
    return this.http.get<Pagination<Device>>(this.devicesUrl, options).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }

  public findById(id: string) {
    return this.http.get<Device>(`${this.devicesUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error)
        })
      );
  }
}
