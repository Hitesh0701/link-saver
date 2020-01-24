import { Routes } from "@angular/router";

export const ALL_ROUTES: Routes = [
  {
    path: "profile",
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