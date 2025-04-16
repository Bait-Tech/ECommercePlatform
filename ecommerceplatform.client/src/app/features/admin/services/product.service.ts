import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/products.interface';
import { environment } from '../../../../environments/environment';
import { PaginatedResult } from '../../../shared/interfaces/paginated-result.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${this.apiUrl}/All`);
  }

  getProductByID(id: number): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.apiUrl}/${id}`);
  }

  getPagedProducts(
    first: number,
    rows: number
  ): Observable<PaginatedResult<IProducts>> {
    const params = new HttpParams()
      .set('pageNumber', (first / rows + 1).toString())
      .set('pageSize', rows.toString());

    return this.http.get<PaginatedResult<IProducts>>(
      `${this.apiUrl}/Paged/Products`,
      { params }
    );
  }

  getProductsByCategory(categoryID: number, subCategoryID?: number) {
    const params = new HttpParams().set('categoryID', categoryID);
    if (subCategoryID) {
      params.set('subCategoryID', subCategoryID);
    }
    return this.http.get<IProducts[]>(`${this.apiUrl}/ProductsByCategory`, {
      params,
    });
  }

  filterProducts(filter: any): Observable<IProducts[]> {
    let params = new HttpParams();

    Object.keys(filter).forEach((key) => {
      if (
        filter[key] !== null &&
        filter[key] !== undefined &&
        filter[key] !== ''
      ) {
        params = params.set(key, filter[key]);
      }
    });

    return this.http.post<IProducts[]>(`${this.apiUrl}/FilterProducts`, filter);
  }

  createProduct(productData: IProducts): Observable<number> {
    const formData = this.createFormData(productData);
    return this.http.post<number>(`${this.apiUrl}/Product`, formData);
  }

  updateProduct(productData: IProducts): Observable<any> {
    const formData = this.createFormData(productData);
    return this.http.put(`${this.apiUrl}/Product`, formData);
  }

  deleteProducts(ids: number[]): Observable<any> {
    const options = {
      body: ids,
    };
    return this.http.delete(`${this.apiUrl}/List`, options);
  }

  private createFormData(product: IProducts): FormData {
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