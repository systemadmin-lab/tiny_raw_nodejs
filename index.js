// uptime monitoring Application

// dependencies
const http = require('http');
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
    res.end('hello world');
 }
 app.createServer(app.handleReqRes);