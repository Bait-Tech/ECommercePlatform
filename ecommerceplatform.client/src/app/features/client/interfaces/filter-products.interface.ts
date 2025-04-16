import { IPaginationParams } from '../../../shared/interfaces/pagination-params.interface';

export interface IFilterProducts {
  paginationParams?: IPaginationParams;
  categoryID: number;
  subCategoryID?: number;
  name: string;
}