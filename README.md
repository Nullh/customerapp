# customerapp
A simple node.js express/mongoDB app, based on [Brad Traversy's Youtube Tutorial](https://youtu.be/gnsO8-xJ8rs).

To try out this app run:
```
> git clone https://github.com/Nullh/customerapp.git
> cd customerapp
> npm install
```
You'll also need to install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community]) and create a database called `customerapp`. You'll need to change the line below to match your MongoDB user, if you're using one:
```
var db = mongojs('app:DwarfD0rf@localhost/customerapp', ['users']);
```
When that's all set up just run `npm index` and point a browser at http://localhost:3000
