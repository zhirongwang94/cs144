
default: 
	ls



mixedtomcat:
	locust -f mixed_tomcat.py --host=http://tomcat:8888 --headless -u 200 -r 50 -t 2s 

writetomcat:
	locust -f write_tomcat.py --host=http://tomcat:8888 --headless -u 1 -r 1 -t 2s 

readtomcat:
	locust -f read_tomcat.py --host=http://tomcat:8888 --headless -u 1 -r 1 -t 2s 

readnode:
	locust -f read_node.py --host=http://mean:3000 --headless -u 1 -r 1 -t 2s 

writenode:	
	locust -f write_node.py --host=http://mean:3000 --headless -u 1 -r 1 -t 2s 
		
mixednode:
	locust -f mixed_node.py --host=http://mean:3000 --headless -u 100 -r 4 -t 2s 
		
sendtolocust:
	docker cp ./read_node.py  locust:/home/cs144
