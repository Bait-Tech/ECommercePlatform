import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { HomePageCustomizeComponent } from './components/home-page-customize/home-page-customize.component';
import { TooltipModule } from 'primeng/tooltip';
import { HeroSectionComponent } from './components/home-page-customize/components/hero-section/hero-section.component';
import { ProductsSectionComponent } from './components/home-page-customize/components/products-section/products-section.component';
import { ProductsSectionPopupComponent } from './components/home-page-customize/components/products-section/components/products-section-popup/products-section-popup.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ColorChromeModule } from 'ngx-color/chrome';
import { PendingOrdersComponent } from './components/pending-orders/pending-orders.component';
import { ConfirmedOrdersComponent } from './components/confirmed-orders/confirmed-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'sub-categories', component: SubCategoriesComponent },
      { path: 'home-page-customize', component: HomePageCustomizeComponent },
      { path: 'pending-orders', component: PendingOrdersComponent },
      { path: 'confirmed-orders', component: ConfirmedOrdersComponent },
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
    CategoriesComponent,
    LoginComponent,
    ProductsComponent,
    SubCategoriesComponent,
    HomePageCustomizeComponent,
    HeroSectionComponent,
    ProductsSectionComponent, 
    ProductsSectionPopupComponent,
    PendingOrdersComponent,
    ConfirmedOrdersComponent
  ],
  providers: [MessageService, ConfirmationService,DialogService],
})
export class AdminModule {}
