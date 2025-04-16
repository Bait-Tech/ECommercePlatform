import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsSectionPopupComponent } from './components/products-section-popup/products-section-popup.component';
import { ProductsSectionService } from '../../../../services/products-section.service';
import { IProductsSection } from '../../../../interfaces/products-section.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
  standalone:false,
})
export class ProductsSectionComponent implements OnInit {
  dialogRef: DynamicDialogRef | undefined;
  productSections: IProductsSection[] = [];
  loading: boolean = false;

  constructor(
    private dialogService: DialogService,
    private productsSectionService: ProductsSectionService,
  ) {}

  ngOnInit() {

    this.loadProductSections();
  }

  loadProductSections() {
    this.loading = true;
    this.productsSectionService.getAll().subscribe({
      next: (sections) => {
        this.productSections = sections;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product sections:', error);
        this.loading = false;
      },
    });
  }

  addNewSection() {
    this.dialogRef = this.dialogService.open(ProductsSectionPopupComponent, {
      header: 'Section Management',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.dialogRef.onClose.subscribe((result) => {
        this.loadProductSections();
    });
  }

  editSection(section: IProductsSection) {
    this.dialogRef = this.dialogService.open(ProductsSectionPopupComponent, {
      header: 'Edit Section',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        section: section,
      },
    });

    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.loadProductSections();
      }
    });
  }

  deleteSection(id: number) {
    this.productsSectionService.delete(id).subscribe((result) => {
      if (result) {
        this.loadProductSections();
      }
    });
  }
}