const url = require('url');
const { StringDecoder } = require('string_decoder');
//app scaffolding
const handeler = {};

handeler.handleReqRes = function (req,res){
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
module.exports = handeler;