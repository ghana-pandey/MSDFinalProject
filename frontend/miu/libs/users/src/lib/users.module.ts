import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common';
import { LoginComponent } from './Auth/login/login.component'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild([{
      path:'login',
      component:LoginComponent
    }])],
    declarations: [
      LoginComponent
    ]
})
export class UsersModule {}




