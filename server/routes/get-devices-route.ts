import {Request, Response} from 'express';
import {USERS} from "../data/data-users";
import {DEVICES} from "../data/data-devices";
import {stat} from "fs";
import {Device} from "../models/Device";

export function getDeviceById(request: Request, response: Response) {
  const deviceId = request.params["id"];
  const user = DEVICES.find(device => device.id.toString() == deviceId);
  response.status(200).json(user);
}

export function getDevices(request: Request, response: Response) {

  const serial = request.query.serial || 0,
    sortOrder = request.query.sortOrder || 'asc',
    pageNumber = Number(request.query.pageNumber) || 0,
    pageSize = Number(request.query.pageSize) || 5;

  let devices: Device[] = [];

  if (serial != 0) {
    devices = DEVICES.filter(
      device => device.SerialNumber == Number(serial)
    )
  } else {
    devices = DEVICES;
  }

  devices.sort((user1, user2) => user1.SerialNumber < user2.SerialNumber ? 1 : -1);
  if (sortOrder == 'desc') {
    devices.reverse()
  }
  const initialPosition = pageNumber * pageSize;

  const userPages = {
    data: devices.slice(initialPosition, initialPosition + pageSize),
    count: devices.length
  };
  response.status(200).json(userPages);
}


