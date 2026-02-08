// uptime monitoring Application

// dependencies
const http = require('http');
const url = require('url');
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
    console.log(trimmedPath);
   
    res.end('hello world');
 }
 app.createServer(app.handleReqRes);