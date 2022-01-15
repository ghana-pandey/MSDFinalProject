import { Category } from "./category";

export class Product {
    id?:string;
    name?:string;
    description?:string;
    image?:string;
    brand?:string;
    price?:number;
    category?:Category;
    totalStock?:number;
    rating?:number;
    dateCreated?:Date;

}