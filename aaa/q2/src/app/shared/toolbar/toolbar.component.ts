import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleEvent = new EventEmitter<boolean>()
  isOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleLeftSideNav() {
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }

}
