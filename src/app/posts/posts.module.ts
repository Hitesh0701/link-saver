import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { PostCardComponent } from './pages/post-card/post-card.component';
import { PostLayoutComponent } from './post-layout/post-layout.component';

@NgModule({
  declarations: [PostDetailComponent, PostAddComponent, PostCardComponent, PostLayoutComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    PostCardComponent
  ]
})
export class PostsModule { }
