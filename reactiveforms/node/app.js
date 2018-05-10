var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Request = require("request");
var registerController=require('./controller/register');
var entryController= require('./controller/entry');
var displayController=require('./controller/displaydata');
var showController=require('./controller/showdata');
var app = express();
var port=9000;
//connect moongoose
mongoose.connect('mongodb://localhost:27017/rForms');
//on connection
mongoose.connection.on('connected',()=>
{
        console.log('connected to the database mongo @ 27017');
}); 
//error connection
mongoose.connection.on('error',(err)=>
{
        if(err)
        {
                console.log("error is :"+err);
        }
 }); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/api/register',registerController.register);

app.get('/api/entry',entryController.entry);
app.post('/api/displaydata',displayController.displaydata);
//app.get('/api/showdata',showController.showdata);

app.use(express.static(path.join(__dirname,'dist')));
app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname,'dist/index.html'));
}
);
console.log("server is running on port "+port);
app.listen(9000);
module.exports = app;
