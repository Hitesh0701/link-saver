import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;

  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLoginFormSubmitted: boolean= false;
  isSignUpFormSubmitted: boolean= false;
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loginForm= new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.signUpForm= new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required)

    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  // Login form submit
  loginFormSubmit(){
    this.isLoginFormSubmitted =true;
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
  }

   // signUp form submit
   signUpFormSubmit(){
    this.isSignUpFormSubmitted =true;
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
    }
  }
}
