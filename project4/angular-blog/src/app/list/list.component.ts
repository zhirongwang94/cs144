import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../posts';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() posts: Post[];

  @Output() openPost = new EventEmitter<Post>();
  @Output() newPost = new EventEmitter(); 



  // posts = POSTS;
  // selectedPost?: Post; 

  // currentItem = 'Televisionnn';

  constructor() {
    //  for(var post of this.posts){
    //    post["elementId"] = "list-post-" ; 
    //  }
  }

  ngOnInit(): void {
  }

  // noUSC(){
  //   alert("NO USC pls");
  // }

  //inform parent that this post is the selected one
  onSelect(post: Post): void{
    // this.selectedPost = post;
    // console.log(this.selectedPost);
    this.openPost.emit(post);
  }

  onNewPost(): void{
    this.newPost.emit();
    // console.log("working in list component");
  }

  getElementId(postid: number): string{
    return "list-post-" + postid;
  }

}


