/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@miu/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'miu-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  

  constructor(private getCategory: CategoriesService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private router:Router) {}

  ngOnInit(): void {
   this.getAllCategories();
    }
  delCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getCategory.deleteCategory(categoryId).subscribe(
          () => {
            this.getAllCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!'
            });
          }
        );
      }
    });
  }
  private getAllCategories() {
    this.getCategory.getCategories().subscribe((category) => {
      this.categories = category;
      
    
  })
}
private editCategory(cid:string){
this.router.navigateByUrl(`addCategory/${cid}`)
}
}
