import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/core/services/users/users.service";
import { takeUntil, take } from "rxjs/operators";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UtilityService } from "src/app/core/utilities/utility.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();
  constructor(
    private _toastr: ToastrService,
    private _utility: UtilityService
  ) {}

  ngOnInit() {}
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
