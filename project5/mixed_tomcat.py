import sys, time, random
from locust import HttpUser, task, between
from random import *

 # /editor/post with the body action=save&username=cs144&postid={num}&title=Hello&body=***World!***. 
 # Replace {num} with a random number between 1 and 500.
class MyUser(HttpUser):
    wait_time = between(1, 2)


    @task(4)
    def readTomcatPost(self):
        postid = randint(1, 500)
        data = "action=open&username=cs144&postid=" + str(postid)
        url = "/editor/post?" + data; 
        res = self.client.get(url=url)


    @task(1)
    def writeTomcatPost(self):
        postid = randint(1, 500)
        data = "action=save&username=cs144&postid=" + str(postid) + "&title=Hello&body=***World!***"
        url = "/editor/post?" + data; 

        res = self.client.post(url=url)

    def on_start(self):
        print("Hello")
