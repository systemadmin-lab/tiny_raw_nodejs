// title:user handler
// Discription:handle user related routes
// Author:Rejuan_Anik




// module scafholding
const handler = {};
handler.userHandler =(requestProperties,callback)=>{
    console.log(requestProperties);
   callback(200, {
      'message': 'this is a user response'
   })
}
module.exports = handler;