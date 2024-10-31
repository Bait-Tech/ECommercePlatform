import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAsideMenuComponent } from './components/admin-aside-menu/admin-aside-menu.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { CategoryComponent } from './components/category/category.component';

// Guard
import { AuthGuard } from '../guards/auth.guard';

// PrimeNG Modules
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG Services
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent }
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    AdminAsideMenuComponent,
    DashboardComponent,
    AdminLayoutComponent,
    CategoryComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    RippleModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToolbarModule,
    PanelMenuModule,
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
    FileUploadModule
  ],
  providers: [
    MessageService,  
    ConfirmationService  
  ]
})
export class AdminModule { }