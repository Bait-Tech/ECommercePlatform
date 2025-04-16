import { IPaginationParams } from "../../../shared/interfaces/pagination-params.interface";

export interface IFilterOrders {
  paginationParams?: IPaginationParams;
  userName?: string;
  isApproved?: boolean;
  PhoneNumber?: string;
}