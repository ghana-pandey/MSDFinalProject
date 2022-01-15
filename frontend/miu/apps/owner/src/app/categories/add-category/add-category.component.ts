/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@miu/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'miu-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categoryform: FormGroup;
  isSubmit?: boolean = false;
  isEditMode?: boolean = false;
  categoryId: string;

  constructor(
    private formbuild: FormBuilder,
    private addCategory: CategoriesService,
    private messageService: MessageService,
    private goback: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryform = this.formbuild.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
    this.checkIfEdit();
  }
  onCancel() {
    this.goback.back();
  }
  onSubmit() {
    this.isSubmit = true;
    const category: Category = {
      id: this.categoryId,
      name: this.categoryform.controls.name.value,
      icon: this.categoryform.controls.icon.value,
    };
    if (this.isEditMode) {
      this.editCategory(category);
    } else {
      this.newCategory(category);
    }
  }
  private newCategory(category) {
    this.addCategory.addCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: `Category ${category.name} is added!`,
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
  private editCategory(category) {
    this.addCategory.editCategory(this.categoryId, category).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Edited',
          detail: `Category ${category.name} is Edited!`,
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
        this.isEditMode = true;
        this.categoryId = params.id;
        this.addCategory.getCategory(params.id).subscribe((getValue) => {
          this.categoryform.controls.name.setValue(getValue.name);
          this.categoryform.controls.icon.setValue(getValue.icon);
        });
      }
    });
  }
}
