import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../shared/services/base-crud.service';
import { HttpClient } from '@angular/common/http';
import { SubCategory } from '../interfaces/sub-category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseCrudService<SubCategory> {
  constructor(http: HttpClient) {
    super(http, 'SubCategory');
  }

  deleteList(ids:number[]):Observable<any>{
    const options = {
      body: ids
    }; 
   return this.http.delete(`${this.fullUrl}/List`, options)
  }
}
