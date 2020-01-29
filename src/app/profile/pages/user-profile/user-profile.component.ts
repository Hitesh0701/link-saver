import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  modalRef: BsModalRef;

  changePasswordForm:FormGroup;
  isChangePasswordSubmited: boolean = false;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  changePasswordFormSubmit(){
    this.isChangePasswordSubmited= true;
    if(this.changePasswordForm.valid){
      console.log(this.changePasswordForm.value)
    }
  }

}
