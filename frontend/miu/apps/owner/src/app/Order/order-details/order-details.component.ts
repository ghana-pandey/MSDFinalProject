/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '@miu/orders';

@Component({
  selector: 'miu-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order:Order;
   ostatus=["pending","approved","shipped"]

  constructor(private orderService:OrderService,
    private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }
private getOrderDetails(){
  this.route.params.subscribe(params=>{
    if(params.id){
      this.orderService.getOrder(params.id).subscribe(order=>{
        console.log(order.orderItems)
        this.order=order
      })

    }
  })
 
}
}
