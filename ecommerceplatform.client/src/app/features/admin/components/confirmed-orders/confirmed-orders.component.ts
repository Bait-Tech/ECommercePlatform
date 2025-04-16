import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime } from 'rxjs';
import { IFilterOrders } from '../../interfaces/filter-orders.interface';
import { IOrders } from '../../interfaces/orders.interface';
import { IProductsOrder } from '../../interfaces/products-order.interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-confirmed-orders',
  templateUrl: './confirmed-orders.component.html',
  styleUrls: ['./confirmed-orders.component.css'],
})
export class ConfirmedOrdersComponent {
  orders: IOrders[] = [];
  selectedOrders: IOrders[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  displayProductsDialog: boolean = false;
  selectedOrderProducts: IProductsOrder[] = [];
  private filterSubject = new Subject<void>();

  filters: IFilterOrders = {
    paginationParams: {
      pageNumber: 1,
      pageSize: 10,
    },
    userName: '',
    PhoneNumber: '',
    isApproved:true
  };

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService
  ) {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadOrders({ first: 0, rows: 10 });
    });
  }

  loadOrders(event: any) {
    this.loading = true;
    const filter: IFilterOrders = {
      paginationParams: {
        pageNumber: event.first + 1,
        pageSize: event.rows,
      },
      userName: this.filters.userName,
      PhoneNumber: this.filters.PhoneNumber,
      isApproved:true
    };

    this.ordersService.getOrders(filter).subscribe({
      next: (response) => {
        this.orders = response?.items;
        this.totalRecords = response?.totalCount??0;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load orders',
        });
        this.loading = false;
      },
    });
  }

  showProducts(order: IOrders) {
    this.selectedOrderProducts = order.productsOrderDTO;
    this.displayProductsDialog = true;
  }

  onFilter() {
    this.filterSubject.next();
  }

  deleteSelectedOrders() {
    if (!this.selectedOrders.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select orders to delete',
      });
      return;
    }

    const orderIds = this.selectedOrders.map((order) => order.orderID!);
    this.ordersService.deleteOrders(orderIds).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Orders deleted successfully',
        });
        this.loadOrders({ first: 0, rows: 10 });
        this.selectedOrders = [];
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete orders',
        });
      },
    });
  }
}