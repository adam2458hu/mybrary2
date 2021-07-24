if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');	
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/',indexRouter);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('error',(err)=>console.log(err));
mongoose.connection.on('connected',()=>{
	console.log("Connected to mongodb");
	app.listen(process.env.PORT,()=>{
		console.log("App is running on port "+process.env.port);
	});
});