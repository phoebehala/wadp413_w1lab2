// require http module
const http = require('http');
const fs = require('fs');

// create a server
// callback function runs every time a request comes in to our server
const server = http.createServer((req, res)=>{
    console.log('request made');
    console.log(req.url);
    console.log(req.method);
    
    // routing
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'home.html';
            break;
        case '/read-message':
            path += 'readmessage.html';
            break;
        case '/write-message':
            path += '/writemessage.html';
            break;
        
    }

    if (req.url === '/write-message' && req.method === 'POST' ){

        const body = []

        // "on" is a listener to certain events
        req.on('data', (chunk) => {
            //console.log(chunk); //Buffer object or binary data
            body.push(chunk)
        })

        console.log( body);
       
    }

    // set header content type (set what kid of response is coming back to it)
    res.setHeader('Content-type','text/html')

    // send an html file
    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    })

 
 });

 
 //.listen(portNumber we litsen to, hostname,()=>{})
// callback fire when we start listening
server.listen(8000, 'localhost',()=>{
    console.log('listen for the request from localhost:8000');
})

 