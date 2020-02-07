
import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/core/services/users/users.service";
import { takeUntil, take } from "rxjs/operators";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UtilityService } from "src/app/core/utilities/utility.service";
import { PostService } from 'src/app/core/services/posts/post.service';

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();
  allPosts: any = [];
  currentPage = 1;
  postsLimit = 1;

  constructor(
    private _postsService: PostService,
    private _toastr: ToastrService,
    private _utility: UtilityService
  ) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    const params = {
      currentPage: this.currentPage,
      limit: this.postsLimit
    }
    this._postsService.getAllPosts(params)
    .pipe(
      takeUntil(this._unsubscribe$)
    )
    .subscribe((response: any) => {
      console.log("Posts", response)
    },
    error => {
      // this._utility.routingAccordingToError(error);
    }
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
  showSuccess() {
    this._toastr.success("Hello world!", "Toastr fun!");
  }

  showLoader() {
    this._utility.loaderStart();
  }
}
