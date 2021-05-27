import { Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../posts';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() post?: Post;
  @Output() savePost = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<Post>();
  @Output() previewPost = new EventEmitter<Post>();





  // @Input() item?: string; 

  constructor() { }

  ngOnInit(): void {
    console.log("edit post: " + this.post);
    // console.log(this.item);
  }

  onSave(post: Post): void{
    // console.log("save button works in edit component")
    // console.log("post: ");
    // console.dir(post);
    // console.log("title------------------------------------")
    // console.log(post.title);
    this.savePost.emit(post);
  }

  onDelete(post:Post): void{
    console.log("delete button works in edit component")
    this.deletePost.emit(post);
  }

  onPreview(post:Post): void{
    console.log("preview button works in edit component")
    this.previewPost.emit(post);
  }


  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   console.log("on change:" + this.item);
  // }

}

