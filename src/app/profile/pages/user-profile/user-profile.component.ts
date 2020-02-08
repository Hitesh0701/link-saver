import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';
import { takeUntil } from 'rxjs/operators';
import { UtilityService } from 'src/app/core/utilities/utility.service';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/core/services/posts/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  modalRef: BsModalRef;

  changePasswordForm:FormGroup;
  isChangePasswordSubmited: boolean = false;
  userId: string;
  private _unsubscribe$ = new Subject<boolean>();
  allPosts: any = [];
  lastPage: number;
  postsLimit= 5;
  currentPage = 0;
  userData: any;

  constructor(
    private modalService: BsModalService,
    private _activeRoute: ActivatedRoute,
    private _userService: UsersService,
    private _postsService: PostService,
    private _utility: UtilityService
    
  ) {
    this.userId =  this._activeRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
    this.getUserDetailById(this.userId);
    this.getAllPostsOfUser(this.userId);
  }

  // load more posts on scroll
  onScroll() {
    if (this.currentPage < this.lastPage) {
      this.getAllPostsOfUser(this.userId);
    }
  }

  // get user detail on profile page with route's id
  getUserDetailById(id){
    this._userService
    .getUserDetailById(id)
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(
      (response: any) => {
          this.userData = response.data;
        },
        error => {
          this._utility.routingAccordingToError(error);
        }
      );
  }

  // get all post of user
  getAllPostsOfUser(id) {
    this.currentPage++;
    const params = {
      currentPage: this.currentPage,
      limit: this.postsLimit
    };
    this._postsService
      .getAllPostsOfUser(id, params)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (response: any) => {
          console.log(response)
          this.lastPage = response.data.lastPage;
          this.allPosts = [...this.allPosts, ...response.data.postsList];
          console.log(this.allPosts);
        },
        error => {
          this._utility.routingAccordingToError(error);
        }
      );
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  changePasswordFormSubmit(){
    this.isChangePasswordSubmited= true;
    if(this.changePasswordForm.valid){
      console.log(this.changePasswordForm.value)
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

}
