import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { validateAllFormFields } from 'src/app/core/utilities/custom-validators';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/posts/post.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Store } from 'src/app/shared/models/store.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  store$: Observable<Store>;
  private _unsubscribe$ = new Subject<boolean>();
  user_id = 38;
  addPostForm:FormGroup;
  isAddPostFormSubmited: boolean = false;
  post_id: any;

  constructor(
    public formBuilder: FormBuilder,
    private _postService: PostService,
    private _storeService: StoreService,
    private _activateRoute: ActivatedRoute
  ) {
    this.post_id = this._activateRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.addPostForm = this.formBuilder.group({
      user_id: new FormControl(this.user_id),
      // post_id: new FormControl(null),
      title: [null, [Validators.required]],
      link_urls:this.formBuilder.array([]),
      description:[null, Validators.required]
    })
    this.addNewLink();
    if(this.post_id){
      console.log("Post id", this.post_id)
    }
  }

  addPostFormSubmit(){
    this.isAddPostFormSubmited= true;
    if(this.addPostForm.valid){
      this.addPostForm.controls.user_id.setValue(this.user_id);
      console.log(this.addPostForm.value)
      this._postService.addUpdatePosts(this.addPostForm.value)
    .pipe(
      takeUntil(this._unsubscribe$)
    )
    .subscribe((response: any) => {
      console.log("Result", response.message)
      this.addPostForm.reset();
    },
    error => {
      // this._utility.routingAccordingToError(error);
    }
    );
      this.addPostForm.reset();
    } else {
      validateAllFormFields(this.addPostForm);
    }
  }

  // Urls
  get link_urls() {
    return this.addPostForm.get('link_urls') as FormArray
  }

  // add new link_urls field
  addNewLink() {
    if(this.link_urls.length < 5){
      this.link_urls.push(this.addLink());
    }
    else{
      alert("Cant more than 5");
    }
  }


  addLink(): FormGroup {
    return this.formBuilder.group({
      link_urls: [null, Validators.required]
    });
  }
  removeLink(index) {
    this.link_urls.removeAt(index);
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

}
