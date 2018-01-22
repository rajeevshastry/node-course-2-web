const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
app.set('views', __dirname + '/view')
hbs.registerPartials( __dirname + '/view/partials')
//app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});


app.use((req, res, next)=>{
	var now = new Date().toString();
	var log =`${now} : ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log +'\n', (err)=>{
		if(err){
			console.log('unable to log server actions.');
		}
	});
	next();
	
});

app.use ((req,res,next)=>{
	res.render('maintain.hbs',{
		PageTitle:'Maintain',
		name: 'maintain page',
		welcomeMessage: 'Site is under mainataianance please co-operate!!!!!!',
		home:'Title message'
	
	});
	
});
app.use(express.static(__dirname+'/public'));
app.get('/',(req, res)=>{
	//res.send('<h1>Hello Express!!</h1>');
	/*res.send({
		name:'Rajeev',
		likes:['Reading', 'Music', 'travelling']
	});*/
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		name: 'Home Page',
		welcomeMessage: 'Welcome to EPic home page',
		home: 'Welcome to Orlando'
	});
});

app.get('/about', (req,res)=>{
	//res.send('About page');
	res.render('about.hbs',{
		pageTitle:'About Page',
		home: 'Welcome to Epic'
	});
});

app.get('/bad', (req,res)=>{
	res.send ({
		bike:'City',
		like: ['Lake Mary, Longwood, Winter Springs']
	}, (errormessage,(req, res)=>{
		res.send ({
				error: res.message
		})
	}) );
})
app.listen(3000,()=>{
	console.log('Server is up and running at 3000 port');
});