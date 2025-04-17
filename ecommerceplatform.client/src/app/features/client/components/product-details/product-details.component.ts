import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../../admin/interfaces/products.interface';
import { ProductService } from '../../../admin/services/product.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../state-services/cart.service';
import { ICartState } from '../../interfaces/cart-interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: false,
})
export class ProductDetailsComponent implements OnInit {
  productID!: number;
  product: IProducts | undefined;
  mainImageUrl: string = '';
  selectedImageIndex: number = 0;
  zoomScale: number = 1.5;
  quantity : number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productID = +id;
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.productService
      .getProductByID(this.productID)
      .subscribe((result: IProducts) => {
        this.product = result;

        const mainImageIndex = this.product.images.findIndex(
          (img) => img.isMain
        );
        this.selectedImageIndex = mainImageIndex >= 0 ? mainImageIndex : 0;
        this.mainImageUrl =
          this.product.images.length > 0
            ? this.product.images[this.selectedImageIndex].imageUrl
            : 'assets/placeholder.jpg';
      });
  }

  changeMainImage(index: number): void {
    this.selectedImageIndex = index;
    this.mainImageUrl = this.product!.images[index].imageUrl;
  }

  onImageZoom(event: MouseEvent, container: HTMLElement): void {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const img = container.querySelector('img') as HTMLImageElement;
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = `scale(${this.zoomScale})`;
    }
  }

  resetZoom(): void {
    const img = document.querySelector('.product-img') as HTMLImageElement;
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }

  incrementQuantity(): void {
    if (!this.product) return;
    
    if (this.quantity < this.product.stockQuantity) {
      this.quantity += 1;
    } else {
      this.showOutOfStockMessage();
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  updateQuantity(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    
    if (isNaN(value) || value < 1) {
      this.quantity = 1;
      input.value = '1';
      return;
    }

    if (this.product && value > this.product.stockQuantity) {
      this.quantity = this.product.stockQuantity;
      input.value = this.product.stockQuantity.toString();
      this.showOutOfStockMessage();
      return;
    }

    this.quantity = value;
  }

  private showOutOfStockMessage(): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Maximum Quantity',
      detail: `Only ${this.product!.stockQuantity} items available in stock`,
      life: 3000,
    });
  }

  addToCart(): void {
    if (!this.product || this.product.stockQuantity === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'This product is out of stock',
        life: 3000,
      });
      return;
    }
    
    const cartItem: ICartState = {
      productID: this.product.id, 
      qty: this.quantity,
      product: this.product 
    };
    
    this.cartService.addToCart(cartItem);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.quantity} x ${this.product.name} added to cart`,
      life: 3000,
    });
  }
}