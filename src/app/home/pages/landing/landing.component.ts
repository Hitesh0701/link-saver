import { Component, OnInit } from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/core/services/posts/post.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();
  allPosts: any = [];

  constructor(
    private _postsService: PostService
  ) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this._postsService.getAllPosts()
    .pipe(
      takeUntil(this._unsubscribe$)
    )
    .subscribe((response: any) => {
      console.log("Posts", response)
    },
    error => {
      // this._utility.routingAccordingToError(error);
    }
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
