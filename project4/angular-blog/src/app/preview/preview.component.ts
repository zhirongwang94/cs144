import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../posts';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() post?: Post;
  @Output() editPost =  new EventEmitter<Post>();

  constructor() {
    console.log("hello from preview component");
  }

  ngOnInit(): void {
    // console.log("To Preview: ");
    // console.dir(this.post);
  }

  onEdit(): void{
    console.log("To edit on preview component");
    this.editPost.emit(this.post);
  }
}

// <app-preview [post]="postToDisplay" 
//              (editPost)="editPostHandler($event);"></app-preview> 