/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router:Router,private tokenservice:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token=localStorage.getItem('token')
    if(token){
      const tokendecode=this.tokenservice.getDecodeToken()
      console.log(tokendecode.isOwner)
      if(tokendecode.isOwner) 
      return true;
    }
    this.router.navigate(['/login'])
    return false
  }


}
