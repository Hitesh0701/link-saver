import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectLayoutComponent } from "./layouts/project-layout/project-layout.component";
import { NotFound404Component } from "./component/not-found404/not-found404.component";
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PostsModule } from "../posts/posts.module";
import { TabViewModule } from "primeng/tabview";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { TokenInterceptorService } from "./interceptors/token-interceptor.service";
import { UtilityService } from "./utilities/utility.service";

@NgModule({
  declarations: [
    ProjectLayoutComponent,
    NotFound404Component,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    ModalModule,
    PostsModule,
    TabViewModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TokenInterceptorService, UtilityService]
})
export class CoreModule {}
