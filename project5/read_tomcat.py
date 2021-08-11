import sys, time, random
from locust import HttpUser, task, between
from random import *


class MyUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def readTomcatPost(self):
        postid = randint(1, 500)
        data = "action=open&username=cs144&postid=" + str(postid)
        url = "/editor/post?" + data; 
        res = self.client.get(url=url)

    def on_start(self):
        print("Hello")

