// title:routes
// description:handle request and response
// Author:Rejuan_Anik

const {sampleHandler} =require('./routeHandelers/samplehandler');
const { notFoundHandler } = require('./routeHandelers/notFoundHandler');
const { userHandler } = require('./routeHandelers/userHandeler');
const routes = {
    'sample': sampleHandler,
    'user': userHandler,
    'notFound': notFoundHandler
};
module.exports = routes;