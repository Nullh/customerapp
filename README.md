# customerapp
A simple node.js express/mySQL app, based on [Brad Traversy's Youtube Tutorial](https://youtu.be/gnsO8-xJ8rs).

To try out this app run:
```
> git clone https://github.com/Nullh/customerapp.git
> cd customerapp
> npm install
```
You'll also need to install [mySQL](https://dev.mysql.com/downloads/mysql/) then run the contents of [setupDB.sql](https://github.com/Nullh/customerapp/blob/master/setupDB.sql) as the root user to create the database objects.

### IMPORTANT ###
Change the default passwords in setupDB.sql and index.js to ones you like. There are two users, sessionUser which connctes to DB sessionStore, and test which connects to testDB. Each can have a unique password.
