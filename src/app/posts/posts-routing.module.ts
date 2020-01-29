import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostAddComponent } from './pages/post-add/post-add.component';
import { PostLayoutComponent } from './post-layout/post-layout.component';

const routes: Routes = [
  {
    path: "",
    component: PostLayoutComponent,
    children: [
      {
        path: "detail",
        component: PostDetailComponent
      },
      {
        path: "add",
        component: PostAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
