import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../../admin/interfaces/products.interface';
import { ProductService } from '../../../admin/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilterProducts } from '../../interfaces/filter-products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  subCategoryID!: number;
  productsList: IProducts[] | undefined;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.subCategoryID = +id;
      }
      this.loadProducts();
      
    });
  }

  loadProducts() {
    const filter: IFilterProducts = {
      paginationParams: {
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
      },
      categoryID: 0,
      subCategoryID: this.subCategoryID ?? 0,
      name: this.searchTerm ?? "",
    };

    this.productsService.filterProducts(filter).subscribe((response: any) => {
      this.productsList = response.items;
      this.totalPages = Math.ceil(response.totalCount / this.pageSize);
    });
  }

  getMainImage(product: IProducts): string {
    const mainImage = product.images.find(
      (img) => img.isMain && !img.isDeleted
    );
    return (
      mainImage?.imageUrl ||
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=500'
    );
  }

  calculateDiscount(originalPrice: number, discountPrice: number): number {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch() {
    this.currentPage = 1;
    this.loadProducts();
  }
  goToProductPage(id?: number) {
    if (id== 0 || id == null){
      return;
    }
    
    this.router.navigate(['/product-details', id]);
  }
}