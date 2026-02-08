const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../route');
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
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryString,
        headersObject
    }
    let realData = '';


    const chosenHandeler = routes[trimmedPath] ? routes[trimmedPath] : routes['notFound'];
     chosenHandeler(requestProperties, (statusCode, payload) => {
        statatusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statatusCode);
        res.end(payloadString);

    })


    req.on('data', (buffer)=> {
       realData += decoder.write(buffer);
    })
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);  
        
    }

 }
module.exports = handeler;