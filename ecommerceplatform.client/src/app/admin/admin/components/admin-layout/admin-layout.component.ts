import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../src/app/layout/app.layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
  }

  get containerClass() {
    return {
      'layout-wrapper': true,
      'layout-static': true,
      'layout-static-active': this.layoutService.state.staticMenuDesktopInactive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.state.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.state.ripple
    };
  }
}