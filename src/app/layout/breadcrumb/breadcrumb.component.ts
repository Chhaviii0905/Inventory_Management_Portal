import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: string[] = [];

  friendlyNameMap: { [key: string]: string } = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    users: 'Users',
    logs: 'Logs',
    products: 'Products',
    settings: 'Settings'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrumbs = this.getBreadcrumbs(this.route.root);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.getBreadcrumbs(this.route.root);
      });
  }

  getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: string[] = []): string[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        // Use data.breadcrumb if available, else friendlyNameMap, else routeURL
        const label = child.snapshot.data['breadcrumb'] ||
                      this.friendlyNameMap[routeURL] ||
                      routeURL;
        breadcrumbs.push(label);
      }
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
