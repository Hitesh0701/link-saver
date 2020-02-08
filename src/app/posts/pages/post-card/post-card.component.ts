import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postsData: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirectCardDetail($event){
    $event.stopPropagation();
    $event.preventDefault();
    this.router.navigate(['/detail']);
  }
}
