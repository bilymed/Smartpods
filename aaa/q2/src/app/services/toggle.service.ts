import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef, Type,
  ViewContainerRef
} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {UserFilterComponent} from "../users/user-filter/user-filter.component";

@Injectable()
export class ToggleService {

  private rightSideNav: MatSidenav;
  private viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  setSideNav(sidenav: MatSidenav) {
    this.rightSideNav = sidenav;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  private createView(template: TemplateRef<any>) {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(template)
  }

  toggleComponent<T>(type: Type<T>) {
    this.viewContainerRef.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    let component =  this.viewContainerRef.createComponent(componentFactory);
    this.rightSideNav.toggle();
    return component;
  }

  toggle(template: TemplateRef<any>) {
    this.createView(template);
    return this.rightSideNav.toggle();
  }

  open(template: TemplateRef<any>) {
    this.createView(template);
    return this.rightSideNav.open();
  }

  close() {
    this.rightSideNav.close().then()
  }
}
