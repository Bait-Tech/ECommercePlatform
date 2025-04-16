import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from '../../../../../../services/category.service';
import { ICategories } from '../../../../../../interfaces/categories.interface';
import { ISubCategories } from '../../../../../../interfaces/sub-categories.interface';
import { SubCategoryService } from '../../../../../../services/sub-category.service';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ProductService } from '../../../../../../services/product.service';
import { IProductsSection } from '../../../../../../interfaces/products-section.interface';
import { ISectionProducts } from '../../../../../../interfaces/section-products.interface';
import { ProductsSectionService } from '../../../../../../services/products-section.service';

@Component({
  selector: 'app-products-section-popup',
  templateUrl: './products-section-popup.component.html',
  styleUrls: ['./products-section-popup.component.css'],
})
export class ProductsSectionPopupComponent implements OnInit {
  form: FormGroup;
  displayCategoryDDl: boolean = false;

  categoryList: ICategories[] | undefined;
  subCategoryList: ISubCategories[] | undefined;
  productsList: ISectionProducts[] | undefined;

  section: IProductsSection | undefined;

  categoryID: number = 0;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productsService: ProductService,
    private productsSectionService: ProductsSectionService,
    public config: DynamicDialogConfig
  ) {
    this.form = this.createForm();
  }

  ngOnInit() {
    this.getRelatedData();
    this.checkIfEditMode();
  }

  checkIfEditMode() {
    if (this.config.data && this.config.data.section) {
      this.section = this.config.data.section;
      this.isEditMode = true;
      this.patchFormValues();
    }
  }

  getRelatedData() {
    this.getCategories();
    this.getSubCategories();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: null,
      title: ['', [Validators.required]],
      displayOrder: [0],
      categoryID: [0, [Validators.required]],
      subCategoryID: [0],
      badgeText: [''],
      badgeColor: [''],
      products: ['', [Validators.required]],
    });
  }

  patchFormValues() {
    if (!this.section) return;

    this.form.patchValue({
      id: this.section.id,
      title: this.section.title,
      displayOrder: this.section.displayOrder,
      categoryID: this.section.categoryID,
      subCategoryID: this.section.subCategoryID || 0,
      badgeText: this.section.badgeText || '',
      badgeColor: this.section.badgeColor || '',
    });
    this.form.get('badgeColor')?.reset;

    this.form.get('badgeColor')?.setValue(this.section.badgeColor || '');
    this.categoryID = this.section.categoryID;

    if (this.section.subCategoryID && this.section.subCategoryID > 0) {
      this.displayCategoryDDl = true;
    }

    if (this.section.subCategoryID && this.section.subCategoryID > 0) {
      this.getProducts(this.section.subCategoryID);
      return;
    }
    this.getProducts();
  }

  saveSection() {
    if (this.form.valid) {
      const formValue = this.form.value;
      formValue.products = this.productsList?.filter((p) => p.isSelected) || [];

      if (this.isEditMode) {
        this.productsSectionService.update(formValue).subscribe((result) => {
          if (result > 0) {
            this.ref.close(formValue);
          }
        });
        return;
      }
      this.productsSectionService.insert(formValue).subscribe((result) => {
        if (result > 0) {
          this.ref.close(formValue);
        }
      });
    }
  }

  cancel() {
    this.ref.close();
  }

  getMainImage(product: ISectionProducts): string | null {
    if (!product.images || product.images.length === 0) {
      return null;
    }

    const mainImage = product.images.find(
      (img) => img.isMain && !img.isDeleted
    );

    if (!mainImage) {
      const firstValidImage = product.images.find((img) => !img.isDeleted);
      return firstValidImage ? firstValidImage.imageUrl : null;
    }

    return mainImage.imageUrl;
  }

  onCategoryChange(event: DropdownChangeEvent) {
    this.categoryID = event.value;

    const filteredSubCategories = this.subCategoryList?.filter(
      (sc) => sc.categoryID == this.categoryID
    );

    if (filteredSubCategories && filteredSubCategories.length > 0) {
      this.displayCategoryDDl = true;

      return;
    }
    this.displayCategoryDDl = false;
    this.getProducts();
  }

  onSubCategoryChange(event: DropdownChangeEvent | number): void {
    let subCategoryID: number =
      typeof event === 'number' ? event : event?.value;

    this.getProducts(subCategoryID);
  }

  private getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategories[]) => {
        this.categoryList = categories;
      });
  }

  private getSubCategories() {
    this.subCategoryService
      .getAll()
      .subscribe((subCategories: ISubCategories[]) => {
        this.subCategoryList = subCategories;
      });
  }

  private getProducts(subCategoryID?: number): void {
    this.productsService
      .getProductsByCategory(this.categoryID, subCategoryID)
      .subscribe((products: ISectionProducts[]) => {
        this.productsList = products.map((product) => {
          const isSelected =
            this.section?.products?.some((p) => p.id === product.id) || false;
          const mainImageUrl = this.getMainImage(product);
          return {
            ...product,
            mainImageUrl,
            isSelected,
          };
        });
      });
  }
}