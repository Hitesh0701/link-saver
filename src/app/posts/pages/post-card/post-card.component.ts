import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectCardDetail(event){
    event.stopPropogation();
    event.preventDefault();
    this.router.navigate(['/auth/login']);
  }
  viewUserById(){
    
  }
}
