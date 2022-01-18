import { User } from "@miu/users";
import { OrderItem } from "./OrderItem";

export class Order {
    id?:string;
    orderItems?:OrderItem;
    streetName?:string;
    city?:string;
    zip?:string;
    country?:string;
    phone?:string;
    status?:string;
    totalPrice?:number;
    user?:User;
    dateOrdered?:Date;

}