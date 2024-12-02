import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { PaginationParams } from '../interfaces/pagination-params.interface';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  getPaginatedResults<T>(
    url: string,
    paginationParams: PaginationParams
  ): Observable<PaginatedResult<T>> {
    let params = new HttpParams()
      .append('pageNumber', paginationParams.pageNumber.toString())
      .append('pageSize', paginationParams.pageSize.toString());

    return this.http.get<PaginatedResult<T>>(url, { params });
  }
}
