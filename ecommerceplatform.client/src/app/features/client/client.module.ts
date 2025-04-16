import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ColorChromeModule } from 'ngx-color/chrome';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { HomeComponent } from './components/home/home.component';
import { ClientLayoutComponent } from '../../layouts/client-layout/client-layout.component';
import { HeroSectionComponent } from './components/home/components/hero-section/hero-section.component';
import { CategoriesSectionComponent } from './components/home/components/categories-section/categories-section.component';
import { ProductsSectionComponent } from './components/home/components/products-section/products-section.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MessageService } from 'primeng/api';
const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'sub-categories', component: SubCategoriesComponent },
      { path: 'sub-categories/:id', component: SubCategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    PasswordModule,
    CheckboxModule,
    RippleModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToolbarModule,
    MenuModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    PanelMenuModule,
    DividerModule,
    MessageModule,
    MessagesModule,
    AvatarModule,
    BadgeModule,
    FileUploadModule,
    TooltipModule,
    ToolbarModule,
    DynamicDialogModule,
    ColorChromeModule,
  ],
  declarations: [
    HeroSectionComponent,
    HomeComponent,
    CategoriesSectionComponent,
    ProductsSectionComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  providers:[
    MessageService
  ]
})
export class ClientModule {}