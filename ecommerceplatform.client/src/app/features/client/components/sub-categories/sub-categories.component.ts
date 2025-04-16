import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoryService } from '../../../admin/services/sub-category.service';
import { ISubCategories } from '../../../admin/interfaces/sub-categories.interface';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
})
export class SubCategoriesComponent implements OnInit {
  categoryID!: number;
  subCategoriesList: ISubCategories[] | undefined;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private subCategoriesService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.categoryID = +id;
        this.getSubCategoriesByCategoryID();
        return;
      }
      this.getAllSubCategory();
    });
  }

  getSubCategoriesByCategoryID() {
    this.subCategoriesService
      .getByCategoryID(this.categoryID)
      .subscribe((result: ISubCategories[]) => {
        this.subCategoriesList = result;
      });
  }

  getAllSubCategory() {
    this.subCategoriesService.getAll().subscribe((result: ISubCategories[]) => {
      this.subCategoriesList = result;
    });
  }

  get filteredCategories(): ISubCategories[] {
    if (!this.subCategoriesList) return [];

    return this.searchTerm
      ? this.subCategoriesList.filter((category) =>
          category.englishName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        )
      : this.subCategoriesList;
  }

  goToProducts(subCategoryID: number) {
    this.router.navigate(['/products', subCategoryID]);
  }
}