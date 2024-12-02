import { ProductImage } from "./product-image.interface";

export interface Product {
    id?: number;
    name: string;
    description: string;
    code: string;
    categoryID: number;
    subCategoryID?: number;
    price: number;
    discountPrice?: number;
    stockQuantity: number;
    images: ProductImage[];
}