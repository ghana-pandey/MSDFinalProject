/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/product')
    }
    addProduct(product:Product):Observable<Product> {
      return this.http.post('http://localhost:3000/product',product)
    }
    // }
    deleteProduct(productId:string):Observable<Product>{
      return this.http.delete<Product>('http://localhost:3000/product/'+productId)
     }
     getProduct(productId:string):Observable<Product>{
       return this.http.get<Product>('http://localhost:3000/product/'+productId)
    }
     editProd(productId:string,product:Product):Observable<Product>{
      return this.http.put<Product>('http://localhost:3000/product/'+productId,product)
     }
}
