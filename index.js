var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('app:DwarfD0rf@localhost/customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();

/*
var logger  = function(req, res, next){
    console.log('logging...');
    next();
};
app.use(logger);
*/

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

//Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    res.locals.users = null;
    next();
})

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
    db.users.find(function (err, users) {
        res.render('index', {
        title: 'Customers',
        users: users
        });
    })
});

app.post('/users/add', function(req, res){
    
    req.checkBody('first_name', 'first name is required').notEmpty();
    req.checkBody('last_name', 'last name is required').notEmpty();
    req.checkBody('email', 'email name is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        db.users.find(function (err, users) {
            res.render('index', {
                title: 'Customers',
                users: users,
                errors: errors
            });
        })
    } else {

        var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
        }
    
        db.users.insert(newUser, function(err, result){
            if(err){
                console.log(err);
            }

            res.redirect('/');
        });
    }
});

app.delete('/users/delete/:id', function(req, res){
    //console.log(req.params.id);
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, res){
        if(err){
            console.log(err);
        }

        //res.redirect('/');
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});
