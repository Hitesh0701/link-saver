import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
  {
    path:"",
    component: ProfileLayoutComponent,
    children: [
      {
        path:"",
        component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
