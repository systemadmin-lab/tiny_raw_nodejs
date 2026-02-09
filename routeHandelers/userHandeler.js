// title:user handler
// Discription:handle user related routes
// Author:Rejuan_Anik

//dependencies
const data = require('../lib/data');
const {hash} = require('../helpers/utilities');


// module scafholding
const handler = {};
handler.userHandler =(requestProperties,callback)=>{
      const acceptedMethods = ['get', 'post', 'put', 'delete'];
        if(acceptedMethods.indexOf(requestProperties.method) > -1){
             handler._users[requestProperties.method](requestProperties,callback); 
        }else{
            callback(405);
        }
    
 
}

handler._users = {};


handler._users.post = (requestProperties,callback)=>{
     const first_name =typeof(requestProperties.body.firstname)=== 'string' && requestProperties.body.firstname.trim().length > 0 ? requestProperties.body.firstname : false;
      const last_name =typeof(requestProperties.body.lastname)=== 'string' && requestProperties.body.lastname.trim().length > 0 ? requestProperties.body.lastname : false;
      const phone =typeof(requestProperties.body.phone)=== 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
      const password =typeof(requestProperties.body.password)=== 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
      const tosAgreement =typeof(requestProperties.body.tosAgreement)=== 'boolean' && requestProperties.body.tosAgreement === true ? requestProperties.body.tosAgreement : false;

      if(first_name && last_name && phone && password && tosAgreement){
        //make sure that the user already exists
        data.read('users', phone, (err, udata)=>{
            if(err){
                //user not exists, create one
                const userObject = {
                    first_name,
                    last_name,
                    phone,
                    password : hash(password),
                    tosAgreement
                };
                //store the user to database
                data.create('users', phone, userObject, (err)=>{
                    if(!err){
                        callback(200, {
                            'message': 'user was created successfully'
                        })
                    }else{
                        callback(500, {
                            'error': 'could not create user'
                        })
                    }
                })
            }else{
                callback(400, {
                    'error': 'a user with that phone number already exists'
                })
            }
        })      

      }else{
        callback(400, {
            'error': 'there is an error in your request'
        })
      }
};
handler._users.get = (requestProperties,callback)=>{
    callback(200, {
        'message': 'you are using get method'
    })
}
handler._users.put = (requestProperties,callback)=>{
    callback(200, {
        'message': 'you are using put method'
    })
}
handler._users.delete = (requestProperties,callback)=>{
    callback(200, {
        'message': 'you are using delete method'
    })
}



module.exports = handler;