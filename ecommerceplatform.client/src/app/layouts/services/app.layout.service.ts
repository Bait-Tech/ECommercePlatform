import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  inputStyle: string;
  ripple: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private stateSource = new Subject<LayoutState>();
  stateChange$ = this.stateSource.asObservable();

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    inputStyle: 'filled',
    ripple: true,
  };

  toggleMenu() {
    if (window.innerWidth > 991) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;
    }

    this.stateSource.next(this.state);
  }

  hideMenu() {
    this.state.staticMenuMobileActive = false;
    this.stateSource.next(this.state);
  }

  showMenu() {
    this.state.staticMenuMobileActive = true;
    this.stateSource.next(this.state);
  }
}