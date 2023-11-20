import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {sideNavAnimation, SideNavContentAnimation} from "./sidenav.animations";
import {ToggleService} from "../../services/toggle.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    sideNavAnimation, SideNavContentAnimation
  ]
})
export class SidenavComponent implements OnInit {

  @Input() leftSideNavOpened: boolean = true;
  @ViewChild('rightSideNav', { static: true }) private rightSideNav: MatSidenav;
  @ViewChild('sidenavContent', { static: true, read: ViewContainerRef }) private viewContainerRef: ViewContainerRef;
  rightSideNavOpened: boolean = false;

  constructor(private toggleService: ToggleService) { }

  ngOnInit(): void {
    this.toggleService.setSideNav(this.rightSideNav);
    this.toggleService.setViewContainerRef(this.viewContainerRef);
  }
}
