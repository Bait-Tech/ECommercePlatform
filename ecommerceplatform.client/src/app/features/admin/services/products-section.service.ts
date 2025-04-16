import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProductsSection } from '../interfaces/products-section.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsSectionService {
  private apiUrl = `${environment.apiUrl}/ProductSections`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IProductsSection[]> {
    return this.http.get<IProductsSection[]>(`${this.apiUrl}`);
  }

  insert(section: IProductsSection): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}`, section);
  }

  update(section: IProductsSection): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}`, section);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}