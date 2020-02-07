import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateAllFormFields } from '../../utilities/custom-validators';
import { UsersService } from '../../services/users/users.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
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
<<<<<<< HEAD

  isLoggedIn: Observable<boolean>;
 
=======
  loggedIn$ = this._userService.loggedIn$;

>>>>>>> 05ee2b21db997c080158993867380d6bac96f723
  // User Info after login
  userData: any [];
  
  constructor(
    private modalService: BsModalService,
    private _userService: UsersService
  ) { }

  ngOnInit() {
<<<<<<< HEAD
    
    
    if (localStorage.getItem('token')) {
      this._userService.isLoggedIn.next(true);
    } else {
      this._userService.isLoggedIn.next(false);
    }
    
    this.isLoggedIn = this._userService.loggedIn;

=======
    console.log("status", this.loggedIn$);
>>>>>>> 05ee2b21db997c080158993867380d6bac96f723
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
<<<<<<< HEAD
        localStorage.setItem('token', response.headers.get('Authorization'));
        console.log("Result", response);
=======
        localStorage.setItem('token', response.headers.get('Authorization'))
>>>>>>> 05ee2b21db997c080158993867380d6bac96f723
        this.userData = response.body.data;
        this._usersDataSource.next(this.userData);
        // this.loggedIn$ == true;
        // this._userService.isUserLoggedIn();
        this.loginForm.reset();
        this.modalRef.hide();
        window.location.reload();
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

<<<<<<< HEAD
  
=======
  logout(){
    localStorage.removeItem('token')
    localStorage.clear();
    // this.isLoggedIn == false;
  }

>>>>>>> 05ee2b21db997c080158993867380d6bac96f723
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

  // Logout
  logout(){
    this._userService.userLogout();
  }
  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
