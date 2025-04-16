import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone:true,
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
