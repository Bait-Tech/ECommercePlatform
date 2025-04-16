import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { environment } from '../../../environments/environment';
import { IPaginationParams } from '../interfaces/pagination-params.interface';

@Injectable()
export abstract class BaseCrudService<T> {
  protected fullUrl: string;

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.fullUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.fullUrl);
  }

  getAllPaged(params: IPaginationParams): Observable<PaginatedResult<T>> {
    const httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber.toString())
      .set('pageSize', params.pageSize.toString());

    return this.http.get<PaginatedResult<T>>(`${this.fullUrl}/Paged`, {
      params: httpParams,
    });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.fullUrl}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.fullUrl, entity);
  }

  createWithImage<T extends object>(
    entity: T,
    imageFile: File | null
  ): Observable<T> {
    const formData = new FormData();

    Object.keys(entity).forEach((key) => {
      const value = (entity as any)[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (imageFile) {
      formData.append('ImageFile', imageFile);
    }
    return this.http.post<T>(this.fullUrl, formData);
  }

  update(id: number, entity: T): Observable<void> {
    return this.http.put<void>(`${this.fullUrl}/${id}`, entity);
  }


  updateWithImage<T extends object>(
    id:number,
    entity: T,
    imageFile: File | null
  ): Observable<T> {
    const formData = new FormData();

    Object.keys(entity).forEach((key) => {
      const value = (entity as any)[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    if (imageFile) {
      formData.append('ImageFile', imageFile);
    }
    return this.http.put<T>(`${this.fullUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.fullUrl}/${id}`);
  }
}
