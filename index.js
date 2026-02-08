// uptime monitoring Application

// dependencies
const http = require('http');
const url = require('url');
const environment = require('./helpers/environments')
const {handleReqRes} = require('./helpers/handlereqres');

//app object - module scaffolding
const app = {};
//configuration

app.createServer = function (handleReqRes) {
       const server = http.createServer(handleReqRes);
       server.listen(environment.port, function () {
           console.log(`server is running on port ${environment.port}`);
       });
}
//handle request and response
app.handleReqRes = handleReqRes;
 
 app.createServer(app.handleReqRes);