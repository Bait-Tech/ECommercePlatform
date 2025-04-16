import { ISectionProducts } from './section-products.interface';

export interface IProductsSection {
  id: number;
  title: string;
  displayOrder: number;
  categoryID: number;
  subCategoryID?: number;
  badgeText: string;
  badgeColor: string;
  products: ISectionProducts[];
}