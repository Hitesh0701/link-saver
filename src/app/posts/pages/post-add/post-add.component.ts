import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { validateAllFormFields } from 'src/app/core/utilities/custom-validators';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  addPostForm:FormGroup;
  isAddPostFormSubmited: boolean = false;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addPostForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      links:this.formBuilder.array([]),
      description:[null, Validators.required]
    })
    this.addNewLink();
    /* this.addPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      link_urls: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }) */
  }

  addPostFormSubmit(){
    this.isAddPostFormSubmited= true;
    if(this.addPostForm.valid){
      console.log(this.addPostForm.value)
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
    this.links.push(this.addLink());
  }


  addLink(): FormGroup {
    return this.formBuilder.group({
      link_urls: [null, Validators.required]
    });
  }
  removeLink(index) {
    this.links.removeAt(index);
  }

}
