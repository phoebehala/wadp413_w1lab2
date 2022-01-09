// require http module
const http = require('http');
const fs = require('fs');

// create a server
// callback function runs every time a request comes in to our server
const server = http.createServer((req, res)=>{
    console.log('request made');
    console.log(req.url);
    console.log(req.method);

    if (req.url === '/read-message' && req.method === 'GET'){
        try{
            let data = fs.readFileSync('lect-01.txt','utf8')
            
            res.setHeader('Content-type','text/html')
            res.write(`
                <h1>Read a message</h1>
                <h2>${data.split('+').join(' ')}</h2>
            `)
            return res.end()

        }catch(e){
            console.log('Error', e.stack)
        }
    }

    if (req.method === 'GET' ){
        
        // routing
        let path = './views/';
        switch(req.url){
            case '/':
                path += 'home.html';
                break;
            case '/write-message':
                path += '/writemessage.html';
                break;
            
        }

         // set header content type (set what kinds of response is coming back to it)
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

        

    }

    

    if (req.url === '/write-message' && req.method === 'POST' ){

        const body = []

        // "on" is a listener to certain events(listen on the request)
        req.on('data', (chunk) => { 
            // console.log(chunk); //Buffer object or binary data
            body.push(chunk)
           
        })
        
        // req.on('end') >>> eventlistener that gets triggered once the incoming request is done
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();  // convert buffer data to string
             console.log('parsedBody:',parsedBody); // message=hi
             
            const message = parsedBody.split('=')[1]
            // fs.writeFileSync('lect-01.txt', message)
            // .writeFile() >>> async
            fs.writeFile('lect-01.txt', message, (err) => {
                if(err) throw err
                res.statusCode = 302
                res.setHeader('Location', '/')  // redirect to home page
                return res.end()
            })         

        })      
       
    }

   
    
 
 });

 
 //.listen(portNumber we litsen to, hostname,()=>{})
// callback fire when we start listening
server.listen(8000, 'localhost',()=>{
    console.log('listen for the request from localhost:8000');
})

 