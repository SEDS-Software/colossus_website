### Colossus Website
This is a website build with react to host the data from colossus and make it easily viewable from anyone with a device

It is supposed to function in conjunction with the [colossus_server](https://github.com/cyficowley/colossus_server) database

Built by cyrus cowley with create react app and chart.js

It should be accessable to anyone by typing in 192.168.1.100 while on the colossus wifi

Mobile devices may have to turn off data because they don't like that the wifi isn't providing internet so won't fully connect otherwise

##### To run dev server: 
1. clone the repository 
2. open the website directory
3. yarn install
4. yarn run

##### To run production server on the raspberry pi: 
1. Plug in the raspberry pi.  It is started by commands in `/etc/rc.local` and the output is routed to port 80 so you can visit the website by going to the ip address of the raspberry pi (192.168.1.100)

##### To run production server on a new device: 
1. clone the repository 
2. open the website directory
3. npm install
4. npm run build
5. cd build
6. serve -s
7. figure out how to route the output to port 80 from whatever port it is

##### Configure
If the ip address of the flask server ever changes
1. go into `website/src/utils/UpdateValues.js`
2. on line 5 change the ip address to that of the websocket (the ip address of the raspberry pi)
3. rebuild and run

##### Make changes on website
Clone this github repo then make your changes

`git add` all changed files

`git commit -m "a message about the changes"`

`git push`

Then on any device that you are using the server on 

`git pull`

To git pull on the raspberry pi you either need to make the colossus network have an actual internet connection or you can edit wpa_suplicant.conf and add whatever wifi network you want.

`sudo vim /etc/wpa_supplicant/wpa_supplicant.conf`

Add a new wifi network entry in the same form as the the rest then follow the above steps.

then after getting all the changes pulled:
1. open the website directory
2. npm install
3. npm run build
4. cd build
5. serve -s
