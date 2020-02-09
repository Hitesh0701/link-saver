import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/utilities/utility.service';
import { PostService } from 'src/app/core/services/posts/post.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();

  @Input() postsData: string;

  constructor(
    private router: Router,
    private _utilityService: UtilityService,
    private _postsService: PostService
  ) { }

  ngOnInit() {
  }

  // view complete post on detail page
  redirectCardDetail($event){
    $event.stopPropagation();
    $event.preventDefault();
    this.router.navigate(['/detail']);
  }
  // redirect to link in new browser tab
  redirectToLink($event, link: string){
    $event.stopPropagation();
    $event.preventDefault(); 
    this._utilityService.openLinkInNewTab(link);
  }
  // view user profile
  getUserdDetailById($event, id){
    $event.stopPropagation();
    $event.preventDefault();
    this.router.navigate(['/profile/' +id]);
  }


  //edit post 
  editYourPost(id){
    console.log("Post ID", id);
    this.router.navigate(['/posts/edit/' +id]);
  } 
  
  // delete post
  deletePost(userId, postId){
    const data = {
      user_id: userId,
      post_id: postId
    }
    console.log("Post ID", data);
    this._postsService.deletePost(data)
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(
      (response: any) => {
        console.log("Message", response);
        },
        error => {
          this._utilityService.routingAccordingToError(error);
        }
      );
  }
  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
