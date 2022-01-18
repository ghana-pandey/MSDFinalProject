/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Product, ProductsService } from '@miu/products';

@Component({
  selector: 'miu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products:Product[]=[];
  constructor(private prodService:ProductsService){

  }
  ngOnInit():void {
    this.getProducts();
  }
  private getProducts(){
    
    this.prodService.getProducts().subscribe(resProd=>{
      this.products=resProd;
      console.log(resProd)
    })
  }
}
