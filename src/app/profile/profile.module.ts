import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PostsModule } from '../posts/posts.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [ProfileLayoutComponent, UserProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PostsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class ProfileModule { }
