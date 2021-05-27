import sys, time, random
from locust import HttpUser, task, between
from random import *


class MyUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def readpost(self):
        postid = randint(1, 500)
        self.client.get('/blog/cs144/' + str(postid))

    def on_start(self):
        print("Hello")

