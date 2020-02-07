import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Store } from "src/app/shared/models/store.model";
import { StoreService } from "../../services/store.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit, OnDestroy {
  store$: Observable<Store>;
  private _unsubscribe$ = new Subject<boolean>();

  constructor(private _storeService: StoreService) {}

  ngOnInit() {
    this._storeService.store$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((store: Store) => {
        console.log("Footer Store Data", store);
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
