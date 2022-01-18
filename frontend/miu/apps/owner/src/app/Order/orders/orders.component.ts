/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@miu/orders';

@Component({
  selector: 'miu-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders=[];

  constructor(private orderService:OrderService,
    private router:Router) { }

  ngOnInit(): void {
    this.getOrders();
  }
private getOrders(){
  this.orderService.getOrders().subscribe(orders=>{
    this.orders=orders;
  })
}
 detailOrder(orderid){
this.router.navigateByUrl(`orders/${orderid}`)
}
}
