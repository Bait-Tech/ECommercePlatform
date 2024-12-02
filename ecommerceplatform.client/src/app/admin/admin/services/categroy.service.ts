import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/All`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(categoryData: Category): Observable<number> {
    const formData = this.createFormData(categoryData);
    return this.http.post<number>(`${this.apiUrl}/Category`, formData);
  }

  updateCategory(categoryData: Category): Observable<any> {
    const formData = this.createFormData(categoryData);
    return this.http.put(`${this.apiUrl}/Category`, formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteCategories(ids: number[]): Observable<any> {
    const options = {
      body: ids,
    };
    return this.http.delete(`${this.apiUrl}/List`, options);
  }

  private createFormData(category: Category): FormData {
    const formData = new FormData();
    formData.append('name', category.name);

    if (category.id) {
      formData.append('id', category.id.toString());
    }

    if (category.imageFile) {
      formData.append('imageFile', category.imageFile);
    }

    return formData;
  }
}
