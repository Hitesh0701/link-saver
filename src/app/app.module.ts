import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PostsModule } from "./posts/posts.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TokenInterceptorService } from "./core/interceptors/token-interceptor.service";

// ngx ui loader
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule
} from "ngx-ui-loader";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: "square-jelly-box"
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PostsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
