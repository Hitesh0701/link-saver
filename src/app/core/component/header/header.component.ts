import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateAllFormFields } from '../../utilities/custom-validators';
import { UsersService } from '../../services/users/users.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  private _unsubscribe$ = new Subject<boolean>();
  private _usersDataSource = new BehaviorSubject([]);
  public userData$ = this._usersDataSource.asObservable();


  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLoginFormSubmitted: boolean= false;
  isSignUpFormSubmitted: boolean= false;
  loggedIn$ = this._userService.loggedIn$;

  // User Info after login
  userData: any [];
  
  constructor(
    private modalService: BsModalService,
    private _userService: UsersService
  ) { }

  ngOnInit() {
    console.log("status", this.loggedIn$);
    this.loginForm= new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.signUpForm= new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  // Login form submit
  loginFormSubmit(){
    this.isLoginFormSubmitted =true;
    if(this.loginForm.valid){
      this._userService.userLogin(this.loginForm.value)
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response: HttpResponse<any>) => {
        localStorage.setItem('token', response.headers.get('Authorization'))
        this.userData = response.body.data;
        this._usersDataSource.next(this.userData);
        // this.loggedIn$ == true;
        // this._userService.isUserLoggedIn();
        this.loginForm.reset();
        this.modalRef.hide();
      },
      error => {
        // this._utility.routingAccordingToError(error);
      }
      );
      }
      else{
        validateAllFormFields(this.loginForm);
      }
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.clear();
    // this.isLoggedIn == false;
  }

   // signUp form submit
   signUpFormSubmit(){
    this.isSignUpFormSubmitted =true;
    if(this.signUpForm.valid){
      this._userService.userSignUp(this.signUpForm.value)
    .pipe(
      takeUntil(this._unsubscribe$)
    )
    .subscribe((response: any) => {
      console.log("Result", response.message)
      this.signUpForm.reset();
    },
    error => {
      // this._utility.routingAccordingToError(error);
    }
    );
    }
    else{
      validateAllFormFields(this.signUpForm);
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
