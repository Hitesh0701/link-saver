import { Injectable } from "@angular/core";
import { TimeoutError, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerService {
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private _toastr: ToastrService) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
      errorMessage = error.error.message || error.message;
    }
    return throwError(error);
  }

  routeAccordingToError(error) {
    console.log(error);
    if (error instanceof TimeoutError) {
      this.toastError("Oops!", error.message);
    } else if (error.status === 0) {
      this.toastError(
        "Oops!",
        "Please check your internet connection or try again later"
      );
    } else {
      this.toastError("Oops!", error.error.message || error.error);
      // if verification link is not valid
      if (error.error === "Unauthorized" || error.status === 401) {
        setTimeout(() => {
          this.redirectToLogin();
        }, 1000);
      } else if (error.error.message === "page under construction") {
        this.router.navigate(["/page-under-construction"]);
      }
    }
  }
  redirectToLogin() {
    console.log("redirectToLogin works");
  }

  toastError(title, details) {
    this._toastr.warning(details, title, {
      closeButton: true,
      positionClass: "toast-top-center",
      timeOut: 4000
    });
  }
}
