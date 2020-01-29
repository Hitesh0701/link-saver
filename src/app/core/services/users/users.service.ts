import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service/base.service';
import { retry, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit {
  baseUrl: any;
  constructor(
    private _baseService: BaseService,
    private _http: HttpClient
  ) { 
    this.baseUrl = this._baseService.baseUrl;
  }

  ngOnInit(){
  }

  getAllUsers(){
    return this._http.get(this.baseUrl + '/getAllUsers')
    .pipe(
      retry(1),
      timeout(10000)
    )
  }

  // login 
  userLogin(data){
    return this._http.post(this.baseUrl + '/login', data, { observe: 'response' })
    .pipe(
      retry(1),
      timeout(10000)
    )
  }
  // Sign Up
  userSignUp(data){
    return this._http.post(this.baseUrl + '/register', data)
    .pipe(
      retry(1),
      timeout(10000)
    )
  }
}
