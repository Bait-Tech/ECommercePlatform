import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICategories } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(`${this.apiUrl}/All`);
  }

  getCategory(id: number): Observable<ICategories> {
    return this.http.get<ICategories>(`${this.apiUrl}/${id}`);
  }

  createCategory(categoryData: ICategories): Observable<number> {
    const formData = this.createFormData(categoryData);
    return this.http.post<number>(`${this.apiUrl}/Category`, formData);
  }

  updateCategory(categoryData: ICategories): Observable<any> {
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

  private createFormData(category: ICategories): FormData {
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