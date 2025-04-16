import { Component, OnInit } from '@angular/core';
import { ICategories } from '../../../admin/interfaces/categories.interface';
import { CategoryService } from '../../../admin/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: ICategories[] | undefined;
  searchTerm: string = '';

  constructor(private categoryService: CategoryService,private router:Router) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((result: ICategories[]) => {
      this.categoriesList = result;
    });
  }
  
  get filteredCategories(): ICategories[] {
    if (!this.categoriesList) return [];
    
    return this.searchTerm
      ? this.categoriesList.filter(category => 
          category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.categoriesList;
  }

  goToSubCategories(categoryId: number) {
    this.router.navigate(['/sub-categories', categoryId]); 
  }
}