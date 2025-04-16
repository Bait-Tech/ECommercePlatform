import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../admin/services/category.service';
import { ICategories } from '../../../../../admin/interfaces/categories.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.css'],
  standalone: false,
})
export class CategoriesSectionComponent implements OnInit {
  categories: ICategories[] | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategories[]) => {
        this.categories = categories;
      });
  }

  onSeeAllClick() {
    this.router.navigate(['/categories']); 
  }
}