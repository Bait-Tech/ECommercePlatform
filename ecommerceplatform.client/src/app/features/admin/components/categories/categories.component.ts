import { Component, OnInit } from '@angular/core';
import { ICategories } from '../../interfaces/categories.interface';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone:false,
})
export class CategoriesComponent implements OnInit {
  categories: ICategories[] = [];
  category: ICategories = { id: 0, name: '' };
  selectedCategories: ICategories[] = [];
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

  editCategory(category: ICategories) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: ICategories) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;

    this.categoryService  
      .deleteCategories(this.selectedCategories.map((c) => c.id))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Categories deleted',
            life: 3000,
          });
          this.selectedCategories = [];
          this.loadCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete categories',
            life: 3000,
          });
          console.error('Error deleting categories:', error);
        },
      });
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
          .updateCategory(this.category)
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
