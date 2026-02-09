// title:user handler
// Discription:handle user related routes
// Author:Rejuan_Anik

//dependencies
const data = require('../lib/data');
const {hash} = require('../helpers/utilities');


// module scafholding
const handler = {};
handler.tokenHandler =(requestProperties,callback)=>{
      const acceptedMethods = ['get', 'post', 'put', 'delete'];
        if(acceptedMethods.indexOf(requestProperties.method) > -1){
             handler._tokens[requestProperties.method](requestProperties,callback); 
        }else{
            callback(405);
        }
    
 
}

handler._tokens = {};


handler._tokens.post = (requestProperties,callback)=>{
     const phone =typeof(requestProperties.body.phone)=== 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
      const password =typeof(requestProperties.body.password)=== 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
        if(phone && password){
            data.read('users', phone, (err, udata)=>{
                if(!err && udata){
                    const hashedPassword = hash(password);
                    if(hashedPassword === udata.password){
                        let tokenId = Math.random().toString(36).substring(2, 10);
                        const expires = Date.now() + 60 * 60 * 1000;
                        const tokenObject = {
                            phone,
                            tokenId,
                            expires
                        }
                        //store the token
                        data.create('tokens', tokenId, tokenObject, (err)=>{
                            if(!err){
                                callback(200, tokenObject);
                            }else{
                                callback(500, {
                                    'error': 'could not create the token'
                                })
                            }
                        })
                    }else{
                        callback(400, {
                            'error': 'password did not match'
                        })
                    }
                }else{
                    callback(400, {
                        'error': 'could not find the specified user'
                    })
                }
            })


        }else{
            callback(400, {
                'error': 'you have a problem in your request'
            })
        }   
     
}

handler._tokens.get = (requestProperties,callback)=>{
  
}

handler._tokens.put = (requestProperties,callback)=>{
    
}
    
handler._tokens.delete = (requestProperties,callback)=>{
   
}



module.exports = handler;