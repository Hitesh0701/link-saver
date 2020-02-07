import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service/base.service';
import { retry, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService{
  baseUrl: any;

  constructor(
    private _baseService: BaseService,
    private _http: HttpClient
  ) { 
    this.baseUrl = this._baseService.baseUrl;
  }

  // get all posts
  getAllPosts(params){
    const PARAMS = new HttpParams({
      fromObject: {
        page: params.currentPage
      }
    });

    return this._http.get(this.baseUrl + '/getAllPosts', { params: PARAMS })
    .pipe(
      retry(1),
      timeout(10000)
    )
  }

  // get all posts of User
  getAllPostsOfUser(){
    return this._http.get(this.baseUrl + '/getAllPostsOfUser')
    .pipe(
      retry(1),
      timeout(10000)
    )
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