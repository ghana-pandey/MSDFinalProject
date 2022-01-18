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
    addProducts(productdata:FormData):Observable<Product> {
      console.log("i am working")
      return this.http.post<Product>('http://localhost:3000/product',productdata)
    }
    // }
    deleteProduct(productId:string):Observable<Product>{
      return this.http.delete<Product>('http://localhost:3000/product/'+productId)
     }
     getProduct(productId:string):Observable<Product>{
       return this.http.get<Product>('http://localhost:3000/product/'+productId)
    }
     editProd(productId:string,productdata:FormData,):Observable<Product>{
      return this.http.put<Product>('http://localhost:3000/product/'+productId,productdata)
     }

     addProd(productdata:FormData):Observable<Product> {
      console.log("i am working")
      return this.http.post<Product>('http://localhost:3000/product',productdata)
    }
    
}
