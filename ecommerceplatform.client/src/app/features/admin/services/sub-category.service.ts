import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubCategories } from '../interfaces/sub-categories.interface';
import { BaseCrudService } from '../../../shared/services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseCrudService<ISubCategories> {
  constructor(http: HttpClient) {
    super(http, 'SubCategory');
  }

  deleteList(ids: number[]): Observable<any> {
    const options = {
      body: ids,
    };
    return this.http.delete(`${this.fullUrl}/List`, options);
  }

  getByCategoryID(categoryID: number): Observable<ISubCategories[]> {
    const params = new HttpParams().set('categoryID', categoryID.toString());

    return this.http.get<ISubCategories[]>(`${this.fullUrl}/SubCategories`, {
      params,
    });
  }
}
