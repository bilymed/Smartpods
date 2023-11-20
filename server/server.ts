import * as express from 'express';
import {Application} from "express";
const cors = require('cors');
import {getUserById, getUsers, getUsersByFilter} from "./routes/get-users-route";
import {GetDepartments} from "./routes/get-departments-route";
import {getDevices} from "./routes/get-devices-route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route('/api/users').get(getUsers);

app.route('/api/users/:id').get(getUserById);

app.route('/api/devices').get(getDevices);

app.route('/api/departments').get(GetDepartments)

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});



