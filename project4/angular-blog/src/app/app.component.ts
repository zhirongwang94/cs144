
import * as cookie from 'cookie';

import { Component, ComponentFactoryResolver } from '@angular/core';
import { Post } from './post';
import { POSTS } from './posts';
import { BlogService } from './blog.service'
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
// import { CONNREFUSED } from 'dns';
// import { CONNREFUSED } from 'dns';

let cookies = cookie.parse(document.cookie);



function parseJWT(token: string) 
{
    // console.log("helllo from PARSEJWT");
    let base64Url = token.split('.')[1];
    // let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // console.log("base64"  +  base64);
    console.log("base64URL:   " + base64Url);
    return JSON.parse(atob(base64Url));
}


enum AppState { List, Edit, Preview };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'angular-blog';
  postsToDisplay?: Post[] = POSTS; 
  postToEdit?: Post;
  postToDisplay?: Post = POSTS[0]; 
  appState: number = 0; //previw = 1, edit = 2; 
  public username: string = "username_fix_later";

  // three states
  // /#/                ==> appState = AppState.List
  // /#/edit/postid     ==> appState = AppState.Edit
  // /#/preview/postid  ==> appState = AppState.Preview
  



  constructor(private blogService: BlogService) {
    let jwt_token = cookies.jwt; 
    let payload = parseJWT(jwt_token);


    this.username = payload.usr;
 
    blogService.fetchPosts(this.username).then((posts) => {
      console.dir(posts);
      this.postsToDisplay = posts; 
    })

    this.appState = 1; 
    
    this.onHashChange();
  }

  ngOnInit(){
    // when the window.location.hash change, 
    // the app will notice 
    window.addEventListener("hashchange", () => this.onHashChange());
  }

  onHashChange(): void{
    let postid = 0; 
    let fragment_url = window.location.hash; 
    let number_list = fragment_url.match(/(\d+)/);

    if (number_list == null || number_list.length == 0 ){
      postid = 0; 
    }
    else{
      postid = parseInt(number_list[0]);
    }

    if (fragment_url.includes("#/preview/", 0)){
      let res = this.blogService.getPost(this.username, postid);
      res.then((post) => {
        this.postToDisplay = post;
        this.previewPostHandler(this.postToDisplay);
      })
    }
    else if(fragment_url.includes("#/edit/", 0)){
      if(postid == 0){
        this.newPostHandler();
      }
      else{
        let res = this.blogService.getPost(this.username, postid );
            res.then((post) =>{
              this.postToEdit = post;  
              this.openPostHandler(this.postToEdit);
            } )
      }
    }
    else{
      this.appState = AppState.List;
    }

  }



  openPostHandler(post: Post) : void{
    this.postToEdit = post;
    window.location.hash = '#/edit/' + post.postid;
    this.appState = AppState.Edit; 
  }

  newPostHandler(): void{
    let post = new Post();
    post.postid = 0; 
    this.postToEdit = post; 
    window.location.hash = "#/edit/0";
    this.appState = AppState.Edit; 
  }


  savePostHandler(post: Post): void{
    this.blogService.setPost(this.username, post).then(()=>{
      this.postToEdit = post; 
      this.appState =  AppState.Edit;
      this.blogService.fetchPosts(this.username).then((posts) => {
        this.postsToDisplay = posts;         
      });  
    });    
  }

  deletePostHandler(post: Post): void{
    this.appState = AppState.List; 
    this.blogService.deletePost(this.username, this.postToEdit.postid).then(()=>{
      window.location.hash = "#/";
      this.blogService.fetchPosts(this.username).then((posts) => {
        this.postsToDisplay = posts; 
      });
    });
  }


  previewPostHandler(post: Post): void{
    this.postToDisplay = post;
    this.appState = AppState.Preview;
    window.location.hash = "#/preview/" + post.postid;
  }

  editPostHandler(post: Post): void{
    this.appState = AppState.Edit;
    window.location.hash = "#/edit/" + post.postid;
  }
}



// <app-edit [post]="postToEdit" 
//           (savePost)="savePostHandler($event);" 
//           (deletePost)="deletePostHandler($event);" 
//           (previewPost)="previewPostHandler($event);"></app-edit>


// <app-preview [post]="postToDisplay" 
//              (editPost)="editPostHandler($event);">
// </app-preview> 
