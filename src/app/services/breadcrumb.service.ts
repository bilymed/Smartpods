import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Breadcrumb} from "../models/breadcrumb";

@Injectable()
export class BreadcrumbService {
// Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Construct the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: Breadcrumb[] = [];
        this.addBreadcrumb(root, breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, breadcrumbs: Breadcrumb[]) {
    if (route) {
      // Add an element for the current route part
      if (route.data.breadcrumb) {
        // const paramID = route.data.breadcrumb.url.replace(':', '');
        const breadcrumb = {
          // label: this.getLabel(route.data),
          label: this.getLabel(route.data),
          // url: route.data.url ? route.data.breadcrumb.url : route.paramMap.get(route.data.breadcrumb.url.replace(':', ''))
          url: this.getUrl(route)
          // url: route.data.breadcrumb.url
        };
        breadcrumbs.push(breadcrumb);
      }
      // Add another element for the next route part
      this.addBreadcrumb(route.firstChild, breadcrumbs);
    }
  }

  private getUrl(route: ActivatedRouteSnapshot) {
    let url: string = '';
    if (route.parent.data.breadcrumb) {
      if (route.data.breadcrumb.url.startsWith(':')) {
        const paramName = route.data.breadcrumb.url.replace(':', '');
        url = `${route.parent.data.breadcrumb.url}/${route.paramMap.get(paramName)}`
      } else {
        url = `${route.parent.data.breadcrumb.url}/${route.data.breadcrumb.url}`
      }

    }else {
      url = route.data.breadcrumb.url;
    }
    return url;
  }

  private setUrl(route: ActivatedRouteSnapshot, breadcrumbUrl: string) {
    const url = '';
    const urlChunks = url.split('/')
    for (const chunk of urlChunks) {
      if (chunk.includes(':')) {
        const param = chunk.replace(':', '');
        break;
      }
    }
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
  }

  private getLabel(data: Data) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb.label;
  }

  // private getUrl(data: Data) {
  //   return typeof data.breadcrumb === 'function'
  //     ? data.breadcrumb(data)
  //     : data.breadcrumb.url;
  // }
}
