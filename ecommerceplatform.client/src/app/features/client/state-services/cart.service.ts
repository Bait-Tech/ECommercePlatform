import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICartState } from '../interfaces/cart-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartState = new BehaviorSubject<ICartState[]>([]);

  public cartState$ = this.cartState.asObservable();

  get currentCartState(): ICartState[] {
    return this.cartState.getValue();
  }

  addToCart(item: ICartState) {
    const currentState = this.currentCartState;
    const existingItemIndex = currentState.findIndex(
      (c) => c.productID === item.productID
    );

    let updatedItems: ICartState[];

    if (existingItemIndex >= 0) { 
      updatedItems = [...currentState];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: updatedItems[existingItemIndex].qty + item.qty,
      };
    } else {
      updatedItems = [...currentState, item];
    }
    
    this.cartState.next(updatedItems);
  }

  clearCart(): void {
    this.cartState.next([]);
  }

  removeFromCart(itemId: number): void {
    const updatedItems = this.currentCartState.filter(
      (item) => item.productID !== itemId
    );
    this.cartState.next(updatedItems);
  }

  getCartTotal(): number {
    return this.currentCartState.reduce((total, item) => total + item.qty, 0);
  }
}
