import { IProductsOrder } from './products-order.interface';

export interface IOrders {
  orderID?: number;
  userName: string;
  location: string;
  phoneNumber: string;
  isConfirmed: boolean;
  createDate: Date;
  confirmDate: Date;
  productsOrderDTO: IProductsOrder[];
}