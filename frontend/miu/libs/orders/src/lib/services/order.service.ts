/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../data/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:3000/orders')
    }
    // addCategory(category:Category):Observable<Category> {
    //   console.log("hi")
    //  return this.http.post('http://localhost:3000/category',category)
    // }
    // deleteCategory(categoryId:string):Observable<Category>{
    //   return this.http.delete<Category>('http://localhost:3000/category/'+categoryId)
    // }
     getOrder(orderId:string):Observable<Order>{
       return this.http.get<Order>('http://localhost:3000/orders/'+orderId)
     }
    // editCategory(categoryId:string,category:Category):Observable<Category>{
    //   return this.http.put<Category>('http://localhost:3000/category/'+categoryId,category)
    // }
}
