// title:routes
// description:handle request and response
// Author:Rejuan_Anik

const {sampleHandelers} =require('./routeHandelers/samplehandler');
const routes = {
    'sample': sampleHandelers
};
module.exports = routes;