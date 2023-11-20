import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {UsersDetailsComponent} from "./users/users-details/users-details.component";
import {UserEditComponent} from "./users/user-edit/user-edit.component";
import {DevicesComponent} from "./devices/devices.component";

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {path: '', component: HomeComponent, data: {breadcrumb: {label: 'Home', url: ''}}},
  {
    path: 'users', data: {breadcrumb: {label: 'Users', url: 'users'}},
    children: [
      {path: '', component: UsersComponent, data: {breadcrumb : {label: '', url:  ''}}},
      {path: 'edit', component: UserEditComponent, data: {breadcrumb : {label: 'Edit', url:  'edit'}}},
      {path: ':id', component: UsersDetailsComponent, data: {breadcrumb: {label: 'Detail', url:  ':id'}}},
    ]
  },
  {path: 'devices', component: DevicesComponent, data: {breadcrumb: {label: 'Devices', url: 'devices'}}}
  // {path: 'users/:id', component: UsersDetailsComponent, data: {breadcrumb: 'Details'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
