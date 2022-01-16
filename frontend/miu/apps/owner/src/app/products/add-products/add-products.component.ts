/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriesService, Product, ProductsService } from '@miu/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'miu-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  productform: FormGroup;
  isSubmit?: boolean = false;
  isEditMode?: boolean = false;
  productId: string;
  categories = [];

  constructor(
    private formbuild: FormBuilder,
    private addProduct: ProductsService,
    private messageService: MessageService,
    private goback: Location,
    private route: ActivatedRoute,
    private getCategory: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategory.getCategories().subscribe((categories) => {
      console.log(categories);
      this.categories = categories;
    });
    this.productform = this.formbuild.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      totalStock: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      rating: ['', Validators.required],
    });
    this.checkIfEdit();
  }
  onCancel() {
    this.goback.back();
  }
  onSubmit() {
    this.isSubmit = true;
    const product: Product = {
      id: this.productId,
      name: this.productform.controls.name.value,
      brand: this.productform.controls.brand.value,
      price: this.productform.controls.price.value,
      category: this.productform.controls.category.value,
      totalStock: this.productform.controls.totalStock.value,
      description: this.productform.controls.description.value,
      image: this.productform.controls.image.value,
      rating: this.productform.controls.rating.value,
    };
    if (this.isEditMode) {
      this.editsProduct(product);
    } else {
      this.newProduct(product);
    }
  }
  private newProduct(product) {
    this.addProduct.addProduct(product).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: `Product ${product.name} is added!`,
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.goback.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!',
        });
      }
    );
  }
  private editsProduct(product) {
    this.addProduct.editProd(this.productId, product).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Edited',
          detail: `Category ${product.name} is Edited!`,
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.goback.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not Edited!',
        });
      }
    );
  }

  private checkIfEdit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        console.log(params.id);
        this.isEditMode = true;

        this.productId = params.id;
        this.addProduct.getProduct(params.id).subscribe((getValue) => {
          this.productform.controls.name.setValue(getValue.name);

          this.productform.controls.brand.setValue(getValue.brand);

          this.productform.controls.price.setValue(getValue.price);

          this.productform.controls.totalStock.setValue(getValue.totalStock);
          this.productform.controls.category.setValue(getValue.category);
          this.productform.controls.description.setValue(getValue.description);
          this.productform.controls.image.setValue(getValue.image);
          this.productform.controls.rating.setValue(getValue.rating);
        });
      }
    });
  }
}
