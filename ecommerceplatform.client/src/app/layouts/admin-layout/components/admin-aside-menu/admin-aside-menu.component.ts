import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-admin-aside-menu',
  templateUrl: './admin-aside-menu.component.html',
  styleUrls: ['./admin-aside-menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, PanelMenuModule],
})
export class AdminAsideMenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/admin/dashboard'],
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-sitemap',
        routerLink: ['/admin/categories'],
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: ['/admin/products'],
      },
      {
        label: 'Sub Categories',
        icon: 'pi pi-fw pi-tags',
        routerLink: ['/admin/sub-categories'],
      },
      {
        label: 'Home Page Customize',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/admin/home-page-customize'],
        badgeStyleClass: 'p-badge-danger',
      },
      {
        label: 'Pending Orders',
        icon: 'pi pi-fw pi-clock',
        routerLink: ['/admin/pending-orders'],
      },
      {
        label: 'Confirmed Orders',
        icon: 'pi pi-fw pi-check-circle',
        routerLink: ['/admin/confirmed-orders'],
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}