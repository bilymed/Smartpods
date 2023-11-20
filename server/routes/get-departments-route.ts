import {Request, Response} from "express";
import {Department} from "../models/Department";

export function GetDepartments(request: Request, response: Response) {
  response.status(200).json(Object.values(Department));
}
