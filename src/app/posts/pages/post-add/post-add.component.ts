import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { validateAllFormFields } from 'src/app/core/utilities/custom-validators';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/posts/post.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Store } from 'src/app/shared/models/store.model';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  store$: Observable<Store>;
  private _unsubscribe$ = new Subject<boolean>();
  user_id: number = null;
  addPostForm:FormGroup;
  isAddPostFormSubmited: boolean = false;
  
  constructor(
    public formBuilder: FormBuilder,
    private _postService: PostService,
    private _storeService: StoreService
  ) { }

  ngOnInit() {

    console.log(this._storeService.getCurrentState());

    this.addPostForm = this.formBuilder.group({
      user_id: new FormControl(null),
      post_id: new FormControl(null),
      title: [null, [Validators.required]],
      links:this.formBuilder.array([]),
      description:[null, Validators.required]
    })
    this.addNewLink();
  }

  addPostFormSubmit(){
    this.isAddPostFormSubmited= true;
    if(this.addPostForm.valid){
      this.addPostForm.controls.post_id.setValue(Math.floor(Math.random()*10) + 1);
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
  get links() {
    return this.addPostForm.get('links') as FormArray
  }

  // add new links field
  addNewLink() {
    if(this.links.length < 5){
      this.links.push(this.addLink());
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
    this.links.removeAt(index);
  }

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

}
