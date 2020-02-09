import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectLayoutComponent } from "./layouts/project-layout/project-layout.component";
import { NotFound404Component } from "./component/not-found404/not-found404.component";
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { TokenInterceptorService } from "./interceptors/token-interceptor.service";
import { UtilityService } from "./utilities/utility.service";
import { SharedModule } from '../shared/modules/shared/shared.module';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    ProjectLayoutComponent,
    NotFound404Component,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
    SharedModule
  ],
  providers: [TokenInterceptorService, UtilityService]
})
export class CoreModule {}
