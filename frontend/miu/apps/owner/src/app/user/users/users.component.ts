/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@miu/products';
import { UserService } from '@miu/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';


@Component({
  selector: 'miu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users=[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private getUsers:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  delUser(userId:string){
    this.getUsers.delUser(userId).subscribe(response=>{
      if(response){
        this.getAllUsers();
      }
    })
  }
  private getAllUsers() {
    this.getUsers.getUsers().subscribe((users) => {
      this.users = users;
      
    
  })

}
}