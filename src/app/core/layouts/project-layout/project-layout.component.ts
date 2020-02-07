import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss']
})
export class ProjectLayoutComponent implements OnInit {

  isLoggedIn$: Observable<any>;

  constructor(
    private _userService: UsersService
    ) { }
    
    ngOnInit() {
      this.isLoggedIn$ = this._userService.isLoggedIn;
  }
}
