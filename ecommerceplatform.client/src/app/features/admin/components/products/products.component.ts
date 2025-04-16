import { Component, OnInit, ViewChild } from '@angular/core';
import { IProductImage } from '../../interfaces/product-image.interface';
import { IProducts } from '../../interfaces/products.interface';
import { ICategories } from '../../interfaces/categories.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone:false,
})
export class ProductsComponent implements OnInit {
  products: IProducts[] = [];
  selectedProducts: IProducts[] = [];
  categories: ICategories[] = [];
  productDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = true;
  totalRecords: number = 0;
  productForm: FormGroup;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit() {
    this.loadCategories();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryID: [null, [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPrice: [0, [Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      images: this.fb.array([]),
    });
  }

  get imagesFormArray() {
    return this.productForm.get('images') as FormArray;
  }

  createImageFormGroup(image: IProductImage) {
    return this.fb.group({
      id: [image.id],
      imageUrl: [image.imageUrl],
      isMain: [image.isMain],
      isDeleted: [image.isDeleted],
      imageFile: [image.imageFile],
    });
  }

  loadProducts(event?: any) {
    this.loading = true;
    const first = event?.first || 0;
    const rows = event?.rows || 10;

    this.productService.getPagedProducts(first, rows).subscribe({
      next: (response) => {
        this.products = response.items;
        this.totalRecords = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories',
          life: 3000,
        });
      },
    });
  }

  openNew() {
    this.productForm.reset();
    this.imagesFormArray.clear();
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: IProducts) {
    this.productForm.patchValue({
      ...product,
    });

    this.imagesFormArray.clear();

    product.images?.forEach((image) => {
      this.imagesFormArray.push(this.createImageFormGroup(image));
    });

    this.productDialog = true;
  }

  removeImage(index: number) {
    const imageControl = this.imagesFormArray.at(index);
    if (imageControl.get('id')?.value) {
      imageControl.patchValue({ isDeleted: true });

      if (imageControl.get('isMain')?.value) {
        const firstNonDeleted = this.imagesFormArray.controls.find(
          (control) => !control.get('isDeleted')?.value
        );
        if (firstNonDeleted) {
          firstNonDeleted.patchValue({ isMain: true });
        }
      }
    } else {
      this.imagesFormArray.removeAt(index);

      if (this.imagesFormArray.length > 0 && !this.hasMainImage()) {
        this.imagesFormArray.at(0).patchValue({ isMain: true });
      }
    }
  }

  setMainImage(index: number) {
    // Remove main flag from all images
    this.imagesFormArray.controls.forEach((control) => {
      control.patchValue({ isMain: false });
    });
    // Set selected image as main
    this.imagesFormArray.at(index).patchValue({ isMain: true });
  }

  hasMainImage(): boolean {
    return this.imagesFormArray.controls.some(
      (control) =>
        !control.get('isDeleted')?.value && control.get('isMain')?.value
    );
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.productService
      .deleteProducts(this.selectedProducts.map((p) => p.id!))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products deleted',
            life: 3000,
          });
          this.selectedProducts = [];
          this.loadProducts();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete products',
            life: 3000,
          });
        },
      });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.productForm.reset();
  }

  saveProduct() {
    this.submitted = true;

    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (productData.id) {
        this.productService.updateProduct(productData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product updated',
              life: 3000,
            });
            this.loadProducts();
            this.hideDialog();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update product',
              life: 3000,
            });
          },
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product created',
              life: 3000,
            });
            this.loadProducts();
            this.hideDialog();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create product',
              life: 3000,
            });
          },
        });
      }
    }
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      for (let file of event.files) {
        const previewUrl = URL.createObjectURL(file);

        const newImage: IProductImage = {
          imageUrl: previewUrl,
          isMain: this.imagesFormArray.length === 0,
          isDeleted: false,
          imageFile: file,
        };

        this.imagesFormArray.push(this.createImageFormGroup(newImage));
      }
      this.fileUpload.clear();
    }
  }

  getMainImageUrl(product: IProducts): string {
    return product.images?.find((img) => img.isMain)?.imageUrl || '';
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find((c) => c.id === categoryId)?.name || '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return field
      ? field.invalid && (field.dirty || field.touched || this.submitted)
      : false;
  }

  getFieldError(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['min'])
        return `${fieldName} must be greater than or equal to ${control.errors['min'].min}`;
    }
    return '';
  }
}