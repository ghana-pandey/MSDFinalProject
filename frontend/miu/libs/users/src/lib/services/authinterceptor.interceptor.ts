/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token=localStorage.getItem('token')
  //   const apiURL=request.url.startsWith('http://localhost:3000/')
  //   if(token && apiURL){
  //     request=request.clone({
  //       setHeaders: {
  //         'Content-Type' : 'application/json; charset=utf-8',
  //         'Accept'       : 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },

  //     })
  //   }
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token is')}`,
      },
    });
       //console.log(setHeaders)
    return next.handle(request);
  }
}
