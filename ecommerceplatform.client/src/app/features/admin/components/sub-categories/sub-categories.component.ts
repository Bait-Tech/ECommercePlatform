import { Component, OnInit, ViewChild } from '@angular/core';
import { ISubCategories } from '../../interfaces/sub-categories.interface';
import { ICategories } from '../../interfaces/categories.interface';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPaginationParams } from '../../../../shared/interfaces/pagination-params.interface';
import { SubCategoryService } from '../../services/sub-category.service';
import { CategoryService } from '../../services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
  standalone: false,
})
export class SubCategoriesComponent implements OnInit {
  subCategories: ISubCategories[] = [];
  selectedSubCategories: ISubCategories[] = [];
  categories: ICategories[] = [];
  subCategoryDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = true;
  totalRecords: number = 0;
  subCategoryForm: FormGroup;

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  deleteCategoriesDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.subCategoryForm = this.fb.group({
      id: [null],
      englishName: ['', [Validators.required]],
      categoryID: [null, [Validators.required]],
      imageUrl: [''],
      imageFile: [null],
    });
  }

  ngOnInit(): void {
    this.loadSubCategories();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
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

  openNew(): void {
    this.subCategoryForm.reset();
    this.submitted = false;
    this.subCategoryDialog = true;
  }

  deleteSelectedCategories(): void {
    this.deleteCategoriesDialog = true;
  }

  loadSubCategories(event?: any): void {
    this.loading = true;

    const params: IPaginationParams = {
      pageNumber: event?.first ?? 1,
      pageSize: event?.rows ?? 10,
    };

    this.subCategoryService.getAllPaged(params).subscribe({
      next: (response) => {
        this.subCategories = response.items;
        this.totalRecords = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load sub categories',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  editCategory(category: ISubCategories): void {
    this.subCategoryForm.patchValue({
      id: category.id,
      englishName: category.englishName,
      arabicName: category.arabicName,
      categoryID: category.categoryID,
      imageUrl: category.imageUrl,
    });
    this.subCategoryDialog = true;
  }

  hideDialog(): void {
    this.subCategoryDialog = false;
    this.submitted = false;
    this.subCategoryForm.reset();
  }

  onFileSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please upload a valid image file (JPG, PNG)',
          life: 3000,
        });
        this.fileUpload.clear();
        return;
      }

      this.subCategoryForm.patchValue({
        imageFile: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.subCategoryForm.patchValue({
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage(): void {
    this.subCategoryForm.patchValue({
      imageFile: null,
      imageUrl: '',
    });
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
  }

  saveCategory(): void {
    this.submitted = true;

    if (this.subCategoryForm.invalid) {
      return;
    }

    const formValue = this.subCategoryForm.value;
    const isEditing = formValue.id != null;
    const imageFile = this.subCategoryForm.get('imageFile')?.value;

    if (isEditing) {
      this.subCategoryService
        .updateWithImage(formValue.id, formValue, imageFile)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category updated',
              life: 3000,
            });
            this.loadSubCategories();
            this.hideDialog();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update category',
              life: 3000,
            });
          },
        });
      return;
    }

    const subCategoryData = {
      englishName: formValue.englishName,
      arabicName: formValue.arabicName,
      categoryID: formValue.categoryID,
    };

    this.subCategoryService
      .createWithImage(subCategoryData, imageFile)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Category created',
            life: 3000,
          });
          this.loadSubCategories();
          this.hideDialog();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create category',
            life: 3000,
          });
        },
      });
  }

  confirmDeleteSelected(): void {
    this.deleteCategoriesDialog = false;

    const selectedIds = this.selectedSubCategories.map((c) => c.id);

    this.subCategoryService.deleteList(selectedIds).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Categories deleted',
          life: 3000,
        });
        this.selectedSubCategories = [];
        this.loadSubCategories();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete categories',
          life: 3000,
        });
      },
    });
  }

  get f() {
    return this.subCategoryForm.controls;
  }
}