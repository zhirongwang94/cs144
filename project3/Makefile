# Name  : Zhirong Wang
# ID    : 105179351
# Email : zwang40@g.ucla.edu

default:
	ls

getzip:
	docker cp mean:/home/cs144/project4-2/project4.zip   /Users/zhirongwang/desktop/cs144/project4/
		

sendserver:
	docker cp /Users/zhirongwang/desktop/cs144/project4/blog-server  mean:///home/cs144/project4


getSucceed: get get1 get3 #200 OK
getFail: get2 #404 not found


authorizeSucceed: authorized #200 OK
authorizeFail: authorize1 authorize2 authorize3 #401 not authorized 

deleteFail: deleteFail #404 not found
deleteSucceed: deleteSucceed #204  no content


postSucceed: post1 # 201 created

post1: #201
	curl --request POST \
	--header "Content-Type:application/json" \
	--data '{"username":"cs144", "postid": 0 , "title": "updated yourtitle", "body": "updated yourbody"}' \
	--url  http://localhost:3000/api/posts \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'\

post2:
	curl --request POST \
	--header "Content-Type:application/json" \
	--data '{"username":"cs144", "postid": 8 , "title": "updated yourtitle<<???>>", "body": "updated yourbody<<???>>"}' \
	--url  http://localhost:3000/api/posts \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'\




deleteFail:
	curl --request DELETE \
	--url http://localhost:3000/api/posts?username=cs144 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'
	

deleteSucceed:
	curl --request DELETE \
	--url http://localhost:3000/api/posts?username=cs144\&postid=8 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'
	
get: 
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'


get1:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144\&postid=2 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'


get2:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144\&postid=9 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'

get3:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144\&posti=9 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'



authorized:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'

authorize1:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144 \

authorize2:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=cs144 \
	--header 'cookie: jwt=eyJhbGciOiJIzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDQ0NTM4LCJleHAiOjE2MjE0NTE3Mzh9.TI7tGlDUgwHYa1tdYJX5TRRZWGgz1nfvBOe1F6-l3iM'

authorize3:
	curl --request GET \
	--url http://localhost:3000/api/posts?username=user2 \
	--header 'cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDU5MTM0LCJleHAiOjE2MjE0NjYzMzR9.Qd_J9_MvXTkYFBSuq-ALx7FgjX4baK5J7UJESfSkyx4'


