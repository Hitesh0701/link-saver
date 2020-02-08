import { Routes } from "@angular/router";

export const ALL_ROUTES: Routes = [
  {
    path: "profile/:id",
    loadChildren: "./profile/profile.module#ProfileModule"
  },
  {
    path: "posts",
    loadChildren: "./posts/posts.module#PostsModule"
  },
  {
    path: "",
    loadChildren: "./home/home.module#HomeModule"
  }
];