import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderComponent } from './mutual/header/header.component';
import { FooterComponent } from './mutual/footer/footer.component';
import {AccordionModule} from 'primeng/accordion'
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomepageComponent, ProductsComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule,BrowserAnimationsModule,RouterModule.forRoot([{
    path:'',
    component:HomepageComponent,
  },
  {path:'products',
component:ProductsComponent}
]),AccordionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
