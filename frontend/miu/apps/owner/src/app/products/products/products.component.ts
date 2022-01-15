/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@miu/products';

@Component({
  selector: 'miu-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products=[]

  constructor(private getProducts:ProductsService) { }

  ngOnInit(): void {
    this.getProducts.getProducts().subscribe((products)=>{
      this.products=products;
    })
  }


}
