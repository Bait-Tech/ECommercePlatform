import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICartState } from '../../../../interfaces/cart-interface';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css']
})
export class OrderPopupComponent implements OnInit {
  @Input() cartItems: ICartState[] = [];
  @Output() submitOrder = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();
  
  orderForm: FormGroup;
  isSubmitting = false;
  
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]]
    });
  }

  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isSubmitting = true;
      
      const productsOrderDTO = this.cartItems.map(item => ({
        productID: item.productID,
        ProductQTY: item.qty
      }));
      
      const orderData = {
        ...this.orderForm.value,
        productsOrderDTO
      };
      
      this.submitOrder.emit(orderData);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
  
  onClose(): void {
    this.closePopup.emit();
  }
  
  get formControls() {
    return this.orderForm.controls;
  }
}