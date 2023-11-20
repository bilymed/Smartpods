import {Request, Response} from 'express';
import {USERS} from "../data-users";

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
  console.log(USERS)
  const filter = request.query.filter || '',
    sortOrder = request.query.sortOrder || 'asc',
    pageNumber = Number(request.query.pageNumber) || 0,
    pageSize = Number(request.query.pageSize) || 5;

  const users = USERS.filter
  (user => user.name.toLowerCase().includes(filter.toString().toLowerCase()))
    .sort((user1, user2) => user1.name < user2.name ? 1 : -1);
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
