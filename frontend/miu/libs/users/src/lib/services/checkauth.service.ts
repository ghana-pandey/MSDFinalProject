/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class CheckauthService {

  constructor(private http:HttpClient,private router:Router) { }
  login(email:string,password:string):Observable<User>{
    return this.http.post<User>('http://localhost:3000/login',{email:email,password:password})
  }
  // setItem(data:string){
  //   localStorage.setItem('token',data)
  // }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
