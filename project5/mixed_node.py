import sys, time, random
from locust import HttpUser, task, between
from random import *

class MyUser(HttpUser):
    wait_time = between(1, 2)

    @task(1)
    def writenode(self):
        postid = randint(1, 500)
        res = self.client.post(
            url="/api/posts", 
            data={"username":"cs144", "postid": postid , "title": "Hello", "body": "***World!***"},
            )


    @task(4)
    def readpost(self):
        postid = randint(1, 500)
        self.client.get('/blog/cs144/' + str(postid))

    def on_start(self):
        res = self.client.post(
            "/login",
            data={"username":"cs144", "password": "password"})

        if res.status_code != 200:
            print("Failed to authenticate the cs144 user on the server")
            sys.exit();


    



            