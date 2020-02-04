import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service/base.service';
import { retry, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{
  baseUrl: any;

  constructor(
    private _baseService: BaseService,
    private _http: HttpClient
  ) { 
    this.baseUrl = this._baseService.baseUrl;
  }

  ngOnInit(){
  }

  addUpdatePosts(data){
    return this._http.post(this.baseUrl + '/createNewPost', data)
    .pipe(
      retry(1),
      timeout(10000)
    )
  }
  deletePost(data){
    return this._http.post(this.baseUrl + '/deletePost', data)
    .pipe(
      retry(1),
      timeout(10000)
    )
  }

}
