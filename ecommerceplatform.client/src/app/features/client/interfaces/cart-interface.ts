import { IProducts } from "../../admin/interfaces/products.interface";

export interface ICartState{
    productID:number|undefined;
    product: IProducts | undefined;
    qty:number;
}