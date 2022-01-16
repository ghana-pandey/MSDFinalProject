import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductsComponent } from './products/products/products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomepageComponent,
    AdminhomeComponent,
    DashboardComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ProductsComponent,
    AddProductsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AdminhomeComponent,
        },
        {
          path: 'adminhome',
          component: DashboardComponent,
        },
        {
          path: 'categories',
          component: CategoriesComponent,
        },
        {
          path: 'addCategory',
          component: AddCategoryComponent,
        },
        {
          path: 'addCategory/:id',
          component: AddCategoryComponent,
        },
        {
          path: 'products',
          component: ProductsComponent,
        },
        {
          path: 'addProduct',
          component: AddProductsComponent,
        },
        {
          path: 'addProduct/:id',
          component: AddProductsComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
