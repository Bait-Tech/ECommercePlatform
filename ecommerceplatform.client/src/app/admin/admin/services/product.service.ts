// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from '../../../../environments/environment';
import { PaginatedResult } from '../../shared/interfaces/paginated-result.interface';
import { PaginationParams } from '../../shared/interfaces/pagination-params.interface';
import { PaginationService } from '../../shared/services/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/All`);
  }

  
  getPagedProducts(first: number, rows: number): Observable<PaginatedResult<Product>> {
    const params = new HttpParams()
      .set('pageNumber', (first / rows + 1).toString())
      .set('pageSize', rows.toString());

    return this.http.get<PaginatedResult<Product>>(`${this.apiUrl}/Paged/Products`, { params });
  }

  createProduct(productData: Product): Observable<number> {
    const formData = this.createFormData(productData);
    return this.http.post<number>(`${this.apiUrl}/Product`, formData);
  }

  updateProduct(productData: Product): Observable<any> {
    const formData = this.createFormData(productData);
    return this.http.put(`${this.apiUrl}/Product`, formData);
  }

  deleteProducts(ids: number[]): Observable<any> {
    const options = {
      body: ids,
    };
    return this.http.delete(`${this.apiUrl}/List`, options);
  }

  private createFormData(product: Product): FormData {
    const formData = new FormData();

    if (product.id) {
      formData.append('id', product.id.toString());
    }

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('code', product.code);
    formData.append('categoryID', product.categoryID.toString());
    formData.append('price', product.price.toString());
    formData.append('stockQuantity', product.stockQuantity.toString());

    if (product.subCategoryID) {
      formData.append('subCategoryID', product.subCategoryID.toString());
    }
    if (product.discountPrice) {
      formData.append('discountPrice', product.discountPrice.toString());
    }

    // Handle images
    product.images.forEach((image, index) => {
      if (image.imageFile) {
        formData.append(`Images[${index}].ImageFile`, image.imageFile);
      }
      formData.append(`Images[${index}].IsMain`, image.isMain.toString());
      formData.append(`Images[${index}].IsDeleted`, image.isDeleted.toString());
      if (image.id) {
        formData.append(`Images[${index}].ID`, image.id.toString());
      }
    });

    return formData;
  }
}
