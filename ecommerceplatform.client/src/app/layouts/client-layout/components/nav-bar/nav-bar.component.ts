import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../features/client/state-services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  destroy$ = new Subject<void>();
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartItems) => {
        console.log(cartItems);
        this.cartItemCount = cartItems.reduce(
          (total, item) => total + item.qty,
          0
        );
      });
  }

  goToCart() {
    this.router.navigate(['/shopping-cart']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}