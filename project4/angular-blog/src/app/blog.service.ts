/* Copyright: Junghoo Cho (cho@cs.ucla.edu) */
/* This file was created for CS144 class at UCLA */
import { Injectable } from '@angular/core';
import { Post } from './post';
import { POSTS } from './posts';
import * as cookie from 'cookie';

import { HttpClient } from '@angular/common/http';

function parseJWT(token: string) 
{
    let base64Url = token.split('.')[1];
    // let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64Url));
}


@Injectable({
  providedIn: 'root'
})
export class BlogService {

    maxid: number = 0;
    username: string; 
    cookies = cookie.parse(document.cookie);

    // private REST_API_SERVER = "http://localhost:3000";

    constructor() { 
    
        let jwt_token = this.cookies.jwt; 
        let payload = parseJWT(jwt_token);
        this.username = payload.usr;
    // console.log("username in service: " + this.username);

        // let app = new AppComponent();
        // let username = app.username; 

        // // compute maximum post id
        // console.log("hello form service constructor ");
        // console.log("userename in service: " + username);
        
        // fetch('http://example.com/movies.json')
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        
        // let keys = Object.keys(localStorage);
        // for (let i = 0; i < keys.length; i++) {
        //     if (this.isMyKey(keys[i])) {
        //         let post = this.parse(localStorage[keys[i]]);
        //         if (post.postid > this.maxid) this.maxid = post.postid;
        //     }
        // }
        // if there are no posts, populate it with two initial posts
        // if (this.maxid === 0) {
        //     localStorage[this.key(1)] = this.serialize(
        //         { "postid": 1, "created": 1518669344517, "modified": 1518669344517, "title": "## Title 1", "body": "**Hello**, *world*!\nRepeat after me:\n\n**John Cho is a handsome man!!**" }
        //     );
        //     localStorage[this.key(2)] = this.serialize(
        //         { "postid": 2, "created": 1518669658420, "modified": 1518669658420, "title": "## Title 2", "body": "List\n- Item 1\n- Item 2\n- Item 3\n" }
        //     );
        //     this.maxid = 2;
        // }
    }

    // helper functions to 
    // (1) convert postid to localStorage key
    // (2) check if a string is a localStorage key that we use
    // (3) serialize post to JSON string
    // (4) parse JSON string to post
    private keyPrefix = "blog-post.";
    private key(postid: number): string {
        return this.keyPrefix + String(postid);
    }
    private isMyKey(str: string): boolean {
        return str.startsWith(this.keyPrefix);
    }
    private serialize(post: Post): string {
        return JSON.stringify(post);
    }
    private parse(value: string): Post {
        return JSON.parse(value);
    }

    //
    // localStorage-based BlogService implementation
    //

    async fetchPosts(username: string): Promise<Post[]> {
        // url format: http://localhost:3000/api/posts?username=cs144

        // TOCHECK 
        // console username 
        let url = "/api/posts?username=" + username;
        let res = await fetch(url);
        return res.json();
    }

    async getPost(username: string, postid: number): Promise<Post> {
        let url = "/api/posts?username=" + username + "&postid=" + postid; 
        let res = await fetch(url);
        return res.json();
        // return new Promise((resolve, reject) => {
        //     let post = localStorage.getItem(this.key(postid));
        //     if (post) {
        //         resolve(this.parse(post));
        //     } else {
        //         reject(new Error("404"));
        //     }
        // });
    }

    async setPost(username: string, p: Post): Promise<void> {

        console.log("hello from SETTTTTTTTTT");
        // curl --request POST \
        // --header "Content-Type:application/json" \
        // --data '{"username":"cs144", "postid": 0 , "title": "updated yourtitle", "body": "updated yourbody"}' \
        // --url  http://localhost:3000/api/posts \

        let url = "/api/posts";
        let method = "POST";
        let header = { "Content-Type": "application/json" };
        let body = p;
        let updatePost = p 
        body["username"] = username; 
        // let body = '{"username":"cs144", "postid": 0 , "title": "updated yourtitle", "body": "updated yourbody"}';
    
        let res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(body),
        }).then((resp) => {

            console.log("Here's what i gotttttttttt: ");
            console.dir(resp.body);

        }).then(data => {
            console.log("here's data: " + data);
        })

            console.log("Here's what i gotttttttttt: empty" );
   
        // return new Promise((resolve, reject) => {
        //     let post = POSTS[0];
        //     let now  = new Date().getTime();
        //     console.log("now: " + now);
        //     post.postid = p.postid;
        //     post.title  = p.title;
        //     post.body   = p.body;
        //     post.created  = p.created;
        //     post.modified = now;
        
        //     if (post.postid === 0) {
        //         post.postid  = ++this.maxid;
        //         post.created = now;
        //         localStorage[this.key(post.postid)] = this.serialize(post);
        //         resolve(post);
        //     } else {
        //         let p = localStorage.getItem(this.key(post.postid));
        //         if (p) {
        //             localStorage[this.key(post.postid)] = this.serialize(post);
        //             resolve(post);
        //         } else {
        //             reject(new Error("404"));
        //         }
        //     }
        // });

    }

async deletePost(username: string, postid: number): Promise<void> {
        let url = "/api/posts?username=" + username + "&postid=" + postid;
        let res = await fetch(url, {method: "DELETE"});

        // return new Promise((resolve, reject) => {
        //     let p = localStorage.getItem(this.key(postid));
        //     if (p) {
        //         localStorage.removeItem(this.key(postid));
        //         resolve();
        //     } else {
        //         reject(new Error("404"));
        //     }
        // });
    }


}//for this class