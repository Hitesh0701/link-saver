import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();
  constructor(
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
