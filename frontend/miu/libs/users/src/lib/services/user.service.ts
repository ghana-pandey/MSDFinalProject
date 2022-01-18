/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../data/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/users')
  }
  addUser(user:User):Observable<User>{
    return this.http.post<User>('http://localhost:3000/register',user)
  }
  delUser(userId:string):Observable<User>{
    return this.http.delete<User>('http://localhost:3000/users/'+userId)
  }
  getDecodeToken():any {
    const token:any = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token)
    }
    return null;
  }

}


