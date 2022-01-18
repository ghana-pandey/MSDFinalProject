/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { CheckauthService } from '@miu/users';

@Component({
  selector: 'miu-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private logoutService:CheckauthService) { }

  ngOnInit(): void {
  }
userlogout(){
this.logoutService.logout();
}
}
