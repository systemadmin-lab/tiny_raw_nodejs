// uptime monitoring Application

// dependencies
const http = require('http');
const url = require('url');
const environment = require('./helpers/environments')
const {handleReqRes} = require('./helpers/handlereqres');
const data = require('./lib/data');




//app object - module scaffolding
const app = {};
//pore muche felbo
data.read('test','newFile',(err,data)=>{
    console.log('this was the error',err);
    console.log('this was the data',data);
   
})

app.createServer = function (handleReqRes) {
       const server = http.createServer(handleReqRes);
       server.listen(environment.port, function () {
           console.log(`server is running on port ${environment.port}`);
       });
}
//handle request and response
app.handleReqRes = handleReqRes;
 
 app.createServer(app.handleReqRes);