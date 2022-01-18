/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '@miu/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {Location} from '@angular/common'

@Component({
  selector: 'miu-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  registerform:FormGroup;
  isSubmit?:boolean=false;

  constructor(
    private messageService: MessageService,
    private formbuild: FormBuilder,
    private userService:UserService,
    private goback: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerform = this.formbuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isOwner: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
     

  })
}
  onSubmit(){
    this.isSubmit=true;
    if(this.registerform.invalid){
      return;
    }
    const user:User={
      name:this.registerform.controls.name.value,
      email:this.registerform.controls.email.value,
      password:this.registerform.controls.password.value,
      phone:this.registerform.controls.phone.value,
      isOwner:this.registerform.controls.isOwner.value,
      street:this.registerform.controls.street.value,
      apartment:this.registerform.controls.apartment.value,
      zip:this.registerform.controls.zip.value,
      city:this.registerform.controls.city.value,
      country:this.registerform.controls.country.value

    }
    this.userService.addUser(user).subscribe(res=>{
      console.log(res);
    })
  }
  onCancel(){

  }

}


