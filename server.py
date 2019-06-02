#!/usr/bin/env python
import socket

sock = socket.socket()
sock.bind(('', 9303))
sock.listen(10)

sock2 = socket.socket()
sock2.bind(('', 9302))
sock2.listen(10)
while(1):
	conn, addr = sock.accept()
	conn2, addr2 = sock2.accept()
	print ('connected:', addr)
	data = conn.recv(16384)
	udata = data.decode("utf-8")
	print("Data: " + udata)
	conn2.send(data)
	conn.close()
	conn2.close()