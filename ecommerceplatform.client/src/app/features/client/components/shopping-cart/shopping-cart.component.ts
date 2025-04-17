import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICartState } from '../../interfaces/cart-interface';
import { CartService } from '../../state-services/cart.service';
import { IOrders } from '../../../admin/interfaces/orders.interface';
import { OrdersService } from '../../../admin/services/orders.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems$: Observable<ICartState[]>;
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;
  showOrderPopup: boolean = false;
  orderSubmitting: boolean = false;
  orderSuccess: boolean = false;
  orderError: boolean = false;

  constructor(
    public cartService: CartService,
    private ordersService: OrdersService
  ) {
    this.cartItems$ = this.cartService.cartState$.pipe(
      tap((items) => this.calculateTotals(items))
    );
  }

  ngOnInit(): void {
    this.calculateTotals(this.cartService.currentCartState);
  }

  calculateTotals(items: ICartState[]): void {
    this.subtotal = 0;
    let discountedTotal = 0;

    items.forEach((item) => {
      if (item.product) {
        this.subtotal += item.product.price * item.qty;

        const itemTotal =
          item.product.discountPrice !== undefined
            ? item.product.discountPrice * item.qty
            : item.product.price * item.qty;

        discountedTotal += itemTotal;
      }
    });

    this.discount = this.subtotal - discountedTotal;
    this.total = discountedTotal;

    this.subtotal = Number(this.subtotal.toFixed(2));
    this.discount = Number(this.discount.toFixed(2));
    this.total = Number(this.total.toFixed(2));
  }

  removeItem(productId: number | undefined): void {
    if (productId !== undefined) {
      this.cartService.removeFromCart(productId);
    }
  }

  increaseQuantity(item: ICartState): void {
    if (item.productID !== undefined) {
      const updatedItem: ICartState = {
        productID: item.productID,
        product: item.product,
        qty: 1,
      };
      this.cartService.addToCart(updatedItem);
    }
  }

  decreaseQuantity(item: ICartState): void {
    if (item.productID !== undefined && item.qty > 1) {
      const updatedItem: ICartState = {
        productID: item.productID,
        product: item.product,
        qty: item.qty - 1,
      };
      this.cartService.removeFromCart(item.productID);
      this.cartService.addToCart(updatedItem);
    } else if (item.productID !== undefined && item.qty === 1) {
      this.removeItem(item.productID);
    }
  }

  submitOrder(): void {
    this.showOrderPopup = true;
  }

  onOrderSubmit(orderData: IOrders): void {
    this.orderSubmitting = true;
    this.orderSuccess = false;
    this.orderError = false;

    this.ordersService.addOrder(orderData).subscribe({
      next: (result) => {
        this.orderSubmitting = false;
        this.orderSuccess = true;
        this.showOrderPopup = false;
        this.cartService.clearCart();
      },
      error: (error) => {
        this.orderSubmitting = false;
        this.orderError = true;
      },
    });
  }

  closeOrderPopup(): void {
    this.showOrderPopup = false;
  }
}