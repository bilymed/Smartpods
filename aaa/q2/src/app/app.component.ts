import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leftSideNavOpened: boolean = true;

  toggleLeftSideNav(opened: boolean) {
    this.leftSideNavOpened = opened;
  }
}
