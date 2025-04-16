export interface IProductImage {
    id?: number;
    imageUrl: string;
    isMain: boolean;
    isDeleted: boolean;
    imageFile?: File;
}