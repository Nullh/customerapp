var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');
var expressValidator = require('express-validator');

//mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:       'localhost',
    user:       'test',
    password:   'oCj4yoE5n',
    database:   'testdb'
});

var app = express();

// Set up the session store
var session = require('express-session');
var sessionStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'sessionUser',
    password: 'oCj4yoE5n',
    database: 'sessionStore'
};
var store = new sessionStore(options);

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ...");    
} else {
    console.log("Error connecting database ...");    
}
});

// Catch errors 
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set up session
app.use(session({
    secret: 'We <3 Secrets',
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week 
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));


// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.get('/', function(req, res){
    // find everything
    if(req.session.values == null)
    {
        req.session.values = {first_name: '', last_name: '', email: ''};
    }
    //console.log(JSON.stringify(req.session));
    connection.query('SELECT * FROM users;', function (err, results, fields) {
        if(err) {console.log(err);};
        res.render('index', {
            title: 'Customers',
            users: results,
            errors: req.session.errors,
            values: req.session.values
        });
    });
});

app.post('/users/add', function(req, res){
    
    req.checkBody('first_name', 'first name is required').notEmpty();
    req.checkBody('last_name', 'last name is required').notEmpty();
    req.checkBody('email', 'email name is required').notEmpty();

    req.session.values = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email};
    
    req.session.errors = req.validationErrors();

    if(req.session.errors){
        res.redirect('/');
    } else {
        connection.query('INSERT INTO users (first_name, last_name, email) VALUES ("'+req.body.first_name+'","'+req.body.last_name+'","'+req.body.email+'");',function(err, rows, fields){
            if(err){console.log(err);};
            res.redirect('/');
        });

        req.session.values = {first_name: '', last_name: '', email: ''};
    }
});

app.delete('/users/delete/:id', function(req, res){
    connection.query('DELETE FROM users WHERE id = "'+req.params.id+'";',function(err, rows, fields){
        if(err){console.log(err);};
        res.redirect('/');
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});
