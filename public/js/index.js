const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const fs = require('fs');
const path = require('path');

// require('./calendar.js');

http.createServer(function (req,res){
    fs.readFile('../index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

