/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../data/user';
import { CheckauthService } from '../../services/checkauth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users?:string;
  loginform?:FormGroup
  isSubmit?:boolean=false;
  checkError=false;
  showMessage="Your Email or password is wrong"

  constructor(private formBuider:FormBuilder,private loginService:CheckauthService,private router:Router) { }

  ngOnInit(): void {
    this.getLoginForm();
  }
  private getLoginForm(){
    this.loginform=this.formBuider.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
 
login(){
  this.isSubmit=true;
  const loginbody={
    email:this.loginform?.controls.email.value,
    password:this.loginform?.controls.password.value
  }
  console.log(loginbody)
  this.loginService.login(loginbody.email,loginbody.password).subscribe(user=>{
    this.checkError=false;
    localStorage.setItem("token",user.token)
    this.router.navigate(['/'])
    
    console.log(user)
  },(error:HttpErrorResponse)=>{
    this.checkError=true;
    if(error.status!==400){
      this.showMessage="Sorry for inconvenience, Please try again later"
    }
  })
  
}
}
