import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrders } from '../interfaces/orders.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IFilterOrders } from '../interfaces/filter-orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/Orders`;

  constructor(private http: HttpClient) {}

  addOrder(items:IOrders):Observable<boolean>{
   return this.http.post<boolean>(`${this.apiUrl}`,items);
  }

  getOrders(
    filter: IFilterOrders
  ): Observable<{ items: IOrders[]; totalCount: number }> {
    console.log(filter)
    return this.http.post<{ items: IOrders[]; totalCount: number }>(
      `${this.apiUrl}/GetOrders`,
      filter
    );
  }

  approveOrders(orderIds: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Approve`, orderIds);
  }

  deleteOrders(orderIds: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Delete`, orderIds);
  }
}