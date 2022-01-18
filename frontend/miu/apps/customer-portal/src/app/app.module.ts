import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './product/product-item/product-item.component';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ProductItemComponent],
  imports: [
    BrowserModule,HttpClientModule,ButtonModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
