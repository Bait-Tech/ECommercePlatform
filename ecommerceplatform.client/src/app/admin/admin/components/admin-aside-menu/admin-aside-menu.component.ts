import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-aside-menu',
  templateUrl: './admin-aside-menu.component.html',
  styleUrls: ['./admin-aside-menu.component.scss'],
})
export class AdminAsideMenuComponent implements OnInit {
  model: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/admin/dashboard'],
      },
      {
        label: 'category',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/admin/categories'],
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: ['/admin/products'],
      },
      {
        label: 'Accounting',
        icon: 'pi pi-fw pi-dollar',
        routerLink: ['/admin/sub-categories'],
      },
      {
        label: 'Messages',
        icon: 'pi pi-fw pi-comment',
        routerLink: ['/messages'],
        badge: '1',
        badgeStyleClass: 'p-badge-danger',
      },
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/projects'],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/settings'],
      },
      {
        label: 'Info',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: ['/info'],
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
