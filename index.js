// uptime monitoring Application

// dependencies
const http = require('http');
const url = require('url');

const {handleReqRes} = require('./helpers/handlereqres');

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
app.handleReqRes = handleReqRes;
 
 app.createServer(app.handleReqRes);