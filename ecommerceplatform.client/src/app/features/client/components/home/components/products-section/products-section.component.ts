import { Component, OnInit } from '@angular/core';
import { IProductsSection } from '../../../../../admin/interfaces/products-section.interface';
import { ProductsSectionService } from '../../../../../admin/services/products-section.service';
import { ISectionProducts } from '../../../../../admin/interfaces/section-products.interface';
import { Router } from '@angular/router';
import { IProducts } from '../../../../../admin/interfaces/products.interface';
import { ICartState } from '../../../../interfaces/cart-interface';
import { CartService } from '../../../../state-services/cart.service';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css'],
  standalone: false,
})
export class ProductsSectionComponent implements OnInit {
  productsSections: IProductsSection[] | undefined;

  constructor(
    private productsSectionService: ProductsSectionService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProductsSections();
  }

  getProductsSections() {
    this.productsSectionService
      .getAll()
      .subscribe((productsSection: IProductsSection[]) => {
        this.productsSections = productsSection.map((section) => ({
          ...section,
          products: section.products.map((product) => ({
            ...product,
            mainImageUrl: this.getProductMainImage(product),
          })),
        }));
      });
  }

  getProductMainImage(product: ISectionProducts): string {
    if (product.mainImageUrl) {
      return product.mainImageUrl;
    }

    if (product.images && product.images.length > 0) {
      const mainImage = product.images.find((img) => img.isMain);
      if (mainImage) {
        return mainImage.imageUrl;
      }
      return product.images[0].imageUrl;
    }

    return 'assets/placeholder-image.png';
  }

  goToProductPage(id?: number) {
    if (id == 0 || id == null) {
      return;
    }

    this.router.navigate(['/product-details', id]);
  }

  addToCart(product: IProducts): void {
    if (!product || product.stockQuantity === 0) {
      return;
    }

    const cartItem: ICartState = {
      productID: product.id,
      qty: 1,
      product: product,
    };

    this.cartService.addToCart(cartItem);
  }
}