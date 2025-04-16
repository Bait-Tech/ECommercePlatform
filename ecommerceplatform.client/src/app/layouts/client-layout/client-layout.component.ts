import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,FooterComponent,NavBarComponent],
})
export class ClientLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  get containerClass(): Record<string, boolean> {
    return {
      'layout-wrapper': true,
      'layout-static': true,
    };
  }
}