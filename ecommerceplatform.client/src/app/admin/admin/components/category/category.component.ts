import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/categroy.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  category: Category = { id: 0, name: '' };
  selectedCategories: Category[] = [];
  categoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  deleteCategoriesDialog: boolean = false;
  submitted: boolean = false;
  loading: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openNew() {
    this.category = { id: 0, name: '' };
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;
    Promise.all(
      this.selectedCategories.map((category) =>
        this.categoryService.deleteCategory(category.id).toPromise()
      )
    ).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Categories deleted',
        life: 3000,
      });
      this.selectedCategories = [];
      this.loadCategories();
    });
  }

  confirmDelete() {
    this.deleteCategoryDialog = false;

    if (this.category.id) {
      this.categoryService.deleteCategory(this.category.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Category deleted',
            life: 3000,
          });
          this.loadCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete category',
            life: 3000,
          });
        },
      });
    }
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.category.imageFile = event.files[0];
    }
  }

  saveCategory() {
    this.submitted = true;

    if (this.category.name?.trim()) {
      if (this.category.id) {
        this.categoryService
          .updateCategory(this.category.id, this.category)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Category updated',
                life: 3000,
              });
              this.loadCategories();
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
      } else {
        this.categoryService.createCategory(this.category).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category created',
              life: 3000,
            });
            this.loadCategories();
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

      this.categoryDialog = false;
      this.category = { id: 0, name: '' };
    }
  }
}
