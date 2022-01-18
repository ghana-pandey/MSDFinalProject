import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {FieldsetModule} from 'primeng/fieldset';

import { UsersComponent } from './user/users/users.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { OrdersComponent } from './Order/orders/orders.component';
import { OrderDetailsComponent } from './Order/order-details/order-details.component';
import { AuthinterceptorInterceptor, GuardService, UsersModule } from '@miu/users';



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
    UsersComponent,
    AddUserComponent,
    OrdersComponent,
    OrderDetailsComponent,
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
    FieldsetModule,
    UsersModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AdminhomeComponent,
          canActivate:[GuardService]
        },
        {
          path: 'adminhome',
          component: DashboardComponent,
          canActivate:[GuardService],
        },
        {
          path: 'categories',
          component: CategoriesComponent,
          canActivate:[GuardService],
        },
        {
          path: 'addCategory',
          component: AddCategoryComponent,
          canActivate:[GuardService],
        },
        {
          path: 'addCategory/:id',
          component: AddCategoryComponent,
          canActivate:[GuardService],
        },
        {
          path: 'products',
          component: ProductsComponent,
          canActivate:[GuardService],
        },
        {
          path: 'addProduct',
          component: AddProductsComponent,
          canActivate:[GuardService],
        },
        {
          path: 'addProduct/:id',
          component: AddProductsComponent,
          canActivate:[GuardService],
        },
        {
          path: 'users',
          component: UsersComponent,
          canActivate:[GuardService],
        },
        {
          path: 'addUser',
          component: AddUserComponent,
          canActivate:[GuardService],
        },
        {
          path: 'orders',         
          component: OrdersComponent,
          canActivate:[GuardService],
        },
      {
          path: 'orders/:id',
          component: OrderDetailsComponent,
        canActivate:[GuardService],
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [MessageService,ConfirmationService,
  {provide:HTTP_INTERCEPTORS,useClass:AuthinterceptorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
