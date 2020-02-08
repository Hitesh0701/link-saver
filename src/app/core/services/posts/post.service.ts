import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseService } from "../base-service/base.service";
import { retry, timeout } from "rxjs/operators";
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: "root"
})
export class PostService {
  baseUrl: any;

  constructor(private _baseService: BaseService, private _http: HttpClient) {
    this.baseUrl = this._baseService.baseUrl;
  }

  // get all posts
  getAllPosts(params) {
    const PARAMS = new HttpParams({
      fromObject: {
        page: params.currentPage,
        limit: params.limit
      }
    });

    return this._http
      .get(this.baseUrl + "/getAllPosts", { params: PARAMS })
      .pipe(retry(1), timeout(10000));
  }

  // get all posts of User
  getAllPostsOfUser(id, params) {
    const PARAMS = new HttpParams({
      fromObject: {
        page: params.currentPage,
        limit: params.limit
      }
    });
    return this._http
      .get(this.baseUrl + "/getAllPostsOfUser/" +id, { params : PARAMS })
      .pipe(retry(1), timeout(10000));
  }

  // get post detail by Id
  getPostDetailById(){
    return this._http
      .get(this.baseUrl + "/getPostDetail")
      .pipe(retry(1), timeout(10000));
  }

  // add or update any post
  addUpdatePosts(data) {
    return this._http
      .post(this.baseUrl + "/createNewPost", data)
      .pipe(retry(1), timeout(10000));
  }

  // delete any post
  deletePost(data) {
    return this._http
      .post(this.baseUrl + "/deletePost", data)
      .pipe(retry(1), timeout(10000));
  }
}
