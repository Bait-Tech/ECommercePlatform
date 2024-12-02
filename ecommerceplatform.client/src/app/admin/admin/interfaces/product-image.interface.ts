export interface ProductImage {
    id?: number;
    imageUrl: string;
    isMain: boolean;
    isDeleted: boolean;
    imageFile?: File;
}