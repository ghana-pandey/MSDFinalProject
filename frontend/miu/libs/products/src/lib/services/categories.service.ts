/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../data/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/category')
    }
    addCategory(category:Category):Observable<Category> {
     return this.http.post('http://localhost:3000/category',category)
    }
    deleteCategory(categoryId:string):Observable<Category>{
      return this.http.delete<Category>('http://localhost:3000/category/'+categoryId)
    }
    getCategory(categoryId:string):Observable<Category>{
      return this.http.get<Category>('http://localhost:3000/category/'+categoryId)
    }
    editCategory(categoryId:string,category:Category):Observable<Category>{
      return this.http.put<Category>('http://localhost:3000/category/'+categoryId,category)
    }
    }



 
