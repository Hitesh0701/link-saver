import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: any;
  constructor(
    private _activeRoute: ActivatedRoute
    
  ) {
    this.postId =  this._activeRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    console.log(this.postId)
  }

}
