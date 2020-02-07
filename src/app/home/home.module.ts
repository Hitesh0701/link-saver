import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PostsModule } from '../posts/posts.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeLayoutComponent, LandingComponent, AboutUsComponent, ContactUsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PostsModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }
