/* eslint-disable no-unused-labels */
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
  imageDisplay: string | ArrayBuffer;

  constructor(
    private formbuild: FormBuilder,
    private addProduct: ProductsService,
    private messageService: MessageService,
    private goback: Location,
    private route: ActivatedRoute,
    private getCategory: CategoriesService
  ) {}

  ngOnInit(): void {
    this.formInital();
    this.getCategories();
    this.checkIfEdit();
  }
  private formInital() {
    this.productform = this.formbuild.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      totalStock: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      rating: ['', Validators.required],
    });
  }
  onCancel() {
    this.goback.back();
  }
  imageUpload(event) {
    console.log(event);
    console.log(this.productform);
    const file = event.target.files[0];
    if (file) {
      this.productform.patchValue({ image: file });
      this.productform.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.isSubmit = true;
    const productFormData = new FormData();
    id: this.productId;
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    // productformdata.append('name',this.productform.controls.name.value)
    // productformdata.append('brand',this.productform.controls.brand.value)
    // productformdata.append('price',this.productform.controls.price.value)
    // productformdata.append('category',this.productform.controls.category.value)
    // productformdata.append('totalStock',this.productform.controls.totalStock.value)
    // productformdata.append('description',this.productform.controls.description.value)
    // productformdata.append('image',this.productform.controls.image.value)
    // productformdata.append('rating',this.productform.controls.rating.value)
    // id: this.productId,

    // name: this.productform.controls.name.value,
    // brand: this.productform.controls.brand.value,
    // price: this.productform.controls.price.value,
    // category: this.productform.controls.category.value,
    // totalStock: this.productform.controls.totalStock.value,
    // description: this.productform.controls.description.value,
    // image: this.productform.controls.image.value,
    // rating: this.productform.controls.rating.value,

    if (this.isEditMode) {
      this.editsProduct(productFormData);
    } else {
      this.newProduct(productFormData);
    }
  }
  private newProduct(productdata: FormData) {
    console.log('prod', productdata);
    this.addProduct.addProducts(productdata).subscribe(
      (product: Product) => {
        console.log(product);

        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: `Product is added!`,
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
          detail: 'Product is not created!',
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
          detail: `Category  is Edited!`,
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
  private getCategories() {
    this.getCategory.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
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
          this.imageDisplay = getValue.image;
          this.productForm.image.updateValueAndValidity();
          this.productform.controls.rating.setValue(getValue.rating);
        });
      }
    });
  }
  get productForm() {
    return this.productform.controls;
  }
}
