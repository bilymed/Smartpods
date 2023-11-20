import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/User";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit, AfterViewInit {

  user: User;
  edit: boolean = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.findById(id).subscribe(
      user => {
        this.user = user
      }
    );
  }

  ngAfterViewInit() {
  }


}
