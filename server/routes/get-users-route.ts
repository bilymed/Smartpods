import {Request, Response} from 'express';
import {USERS} from "../data/data-users";
import {stat} from "fs";

// export function getAllUsers(request: Request, response: Response) {
//   if (request.query.name) {
//     const userName = request.query.name;
//     const users = Users.filter(user => user.name.includes(userName.toString()));
//     response.status(200).json(users);
//   } else {
//     response.status(200).json(Users);
//   }
// }

export function getUserById(request: Request, response: Response) {
  const userId = request.params["id"];
  const user = USERS.find(user => user.id.toString() == userId);
  response.status(200).json(user);
}
export function getUsers(request: Request, response: Response) {

  const name = request.query.name || null,
    status = request.query.status.toString() || null,
    department = request.query.department || null,
    sortOrder = request.query.sortOrder || 'asc',
    pageNumber = Number(request.query.pageNumber) || 0,
    pageSize = Number(request.query.pageSize) || 5;

  const users = USERS.filter(
    user => (name ? user.name.toLowerCase().includes(name.toString().toLowerCase()) : true)
      && (department ? user.department == department : true)
      && (status!=null ? user.status == JSON.parse(status) : true)
  )

  users.sort((user1, user2) => user1.name < user2.name ? 1 : -1);
  if (sortOrder == 'desc') {
    users.reverse()
  }
  const initialPosition = pageNumber * pageSize;

  const userPages = {
    data: users.slice(initialPosition, initialPosition + pageSize),
    count: users.length
  };
  response.status(200).json(userPages);
}

export function getUsersByFilter(request: Request, response: Response) {
  const filter = request.query.filter || '',
    sortOrder = request.query.sortOrder || 'asc',
    pageNumber = Number(request.query.pageNumber) || 0,
    pageSize = Number(request.query.pageSize) || 5;

  const users = USERS.filter(
    user => user.name.toLowerCase().includes(filter.toString().toLowerCase())
  ).sort((user1, user2) => user1.name < user2.name ? 1 : -1);
  if (sortOrder == 'desc') {
    users.reverse()
  }
  const initialPosition = pageNumber * pageSize;

  const userPages = {
    data: users.slice(initialPosition, initialPosition + pageSize),
    count: USERS.length
  };
  response.status(200).json(userPages);
}


