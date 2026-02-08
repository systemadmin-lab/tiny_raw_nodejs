// uptime monitoring Application

// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
//app object - module scaffolding
const app = {};
//configuration
app.config = {
    port: 3000
};
app.createServer = function (handleReqRes) {
       const server = http.createServer(handleReqRes);
       server.listen(app.config.port, function () {
           console.log(`server is running on port ${app.config.port}`);
       });
}
//handle request and response
 app.handleReqRes = function (req,res){
    //request handling
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headersObject = req.headers;
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer)=> {
       realData += decoder.write(buffer);
    })
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);  
        
    })
  res.end('hello world');
 }
 app.createServer(app.handleReqRes);