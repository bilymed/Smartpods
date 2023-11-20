import {Request, Response} from "express";
import {Department} from "../models/Department";

export function GetDepartments(request: Request, response: Response) {
  // let departments: string[] = [];
  // for (let department in Department) {
  //   departments.push(department);
  // }
  response.status(200).json(Object.values(Department));
}
