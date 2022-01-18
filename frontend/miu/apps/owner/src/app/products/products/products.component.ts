/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@miu/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'miu-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products=[]
  
  constructor(private getProducts:ProductsService,
   private router:Router,
   private confirmationService:ConfirmationService,
   private messageService:MessageService ) { }

  ngOnInit(): void {
   this.getAllProducts();
  }
  delProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getProducts.deleteProduct(productId).subscribe(
          () => {
            this.getAllProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }
  private editProduct(pid:string){
    this.router.navigateByUrl(`addProduct/${pid}`)
    }

    private getAllProducts(){
      this.getProducts.getProducts().subscribe((products)=>{
        console.log(products)
        this.products=products;
      })
    }

}
