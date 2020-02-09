import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { PostCardComponent } from './pages/post-card/post-card.component';
import { PostLayoutComponent } from './post-layout/post-layout.component';
import { SharedModule } from '../shared/modules/shared/shared.module';

@NgModule({
  declarations: [PostDetailComponent, PostAddComponent, PostCardComponent, PostLayoutComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule, 
    SharedModule
  ],
  exports:[
    PostCardComponent
  ]
})
export class PostsModule { }
