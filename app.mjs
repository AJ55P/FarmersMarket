import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let produceItems = require('./produce.json');

const dir = fileURLToPath(import.meta.url);

const app = express();
const host = '127.0.0.1';
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(express.static('public'));


app.get('/', function(req, res){
   let homePage = path.join(path.dirname(dir) + "/main.html");
   res.sendFile(homePage);
});

app.get('/produce', function(req, res){
    let resRendered = nunjucks.render("produce.html", {items: produceItems});
    res.send(resRendered);
});

app.get('/proteins', function(req, res){
    let resRendered = nunjucks.render('proteins.html');
    res.send(resRendered);
});

app.get('/misc', function(req, res){
    let resRendered = nunjucks.render('misc.html');
    res.send(resRendered);
});

app.use(function(req, res){
   res.render('404.html', {url: req.url});
});

app.listen(process.env.PORT || port);