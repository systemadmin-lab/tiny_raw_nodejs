// title:routes
// description:handle request and response
// Author:Rejuan_Anik

const {sampleHandler} =require('./routeHandelers/samplehandler');
const { notFoundHandler } = require('./routeHandelers/notFoundHandler');
const routes = {
    'sample': sampleHandler,
    'notFound': notFoundHandler
};
module.exports = routes;