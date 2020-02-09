import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { TabViewModule } from "primeng/tabview";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    ModalModule,
    TabViewModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports:[
    RouterModule,
    BsDropdownModule,
    ModalModule,
    TabViewModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
