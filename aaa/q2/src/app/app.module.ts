import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import {HttpClientInMemoryWebApiModule, InMemoryWebApiModule} from "angular-in-memory-web-api";
import {MatTableModule} from '@angular/material/table';
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToggleService} from "./services/toggle.service";
import { UsersDetailsComponent } from './users/users-details/users-details.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import {BreadcrumbService} from "./services/breadcrumb.service";
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {DepartmentsService} from "./services/departments.service";
import {MatRadioModule} from "@angular/material/radio";
import { UserFilterComponent } from './users/user-filter/user-filter.component';
import {DataService} from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    UsersComponent,
    HomeComponent,
    UsersDetailsComponent,
    BreadcrumbComponent,
    UserEditComponent,
    UserFilterComponent
  ],
  imports: [
    // HttpClientInMemoryWebApiModule.forRoot(UsersDatasource),
    // InMemoryWebApiModule.forRoot(UsersDatasource),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [
    UsersService,
    ToggleService,
    BreadcrumbService,
    DepartmentsService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
