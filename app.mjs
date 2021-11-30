
import nunjucks from 'nunjucks';
import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let produceItems = require('./items.json');

const app = express();
const host = '127.0.0.1';
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.static('public'));


app.get('/', function(req, res){
    let resRendered = nunjucks.render('index.html', {items: produceItems});
    res.send(resRendered);
});



app.listen(port, host, function(){
    console.log("Farmer's Market app server listening on IPV4", host,":", port);
});








