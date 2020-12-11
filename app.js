var express = require ('express');
var mysql = require ('mysql');
var bodyParser = require ("body-parser");

var connection =mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'pass',
	database: 'join_us'
});


var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended :true}));


	app.get("/",function(req,res)
		{
			var q = 'SELECT COUNT(*) AS count FROM users';
		 connection.query(q,function(error,results){
			 if (error) throw error;
                         var count = results[0].count;
			 //res.send(msg);
			 res.render("home",{count: count});
		 });
		});

	app.post('/register',function(req,res)
		{
			var person = { email: req.body.email};
			connection.query('INSERT INTO users SET ?',person,function(err,results)
				{
					if (err) throw err;
					console.log(results);
					res.redirect("/");
				});
		});

	app.listen(8081,function()
		{
			console.log("Server Running on Port 8081 ");
		});
