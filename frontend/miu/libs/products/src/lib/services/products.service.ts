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
    // addCategory(category:Category):Observable<Category> {
    //  return this.http.post('http://localhost:3000/category',category)
    // }
    // deleteCategory(categoryId:string):Observable<Category>{
    //   return this.http.delete<Category>('http://localhost:3000/category/'+categoryId)
    // }
    // getCategory(categoryId:string):Observable<Category>{
    //   return this.http.get<Category>('http://localhost:3000/category/'+categoryId)
    // }
    // editCategory(categoryId:string,category:Category):Observable<Category>{
    //   return this.http.put<Category>('http://localhost:3000/category/'+categoryId,category)
    // }
}
