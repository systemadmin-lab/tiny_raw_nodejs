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
     const id =typeof(requestProperties.queryString.id) === 'string' && requestProperties.queryString.id.trim().length === 8 ? requestProperties.queryString.id : false;
         if(id){
            //lookup the token
            data.read('tokens', id, (err, tokenData)=>{
                if(!err && tokenData){
                    callback(200, tokenData);
                }else{
                    callback(404, {
                        'error': 'token not found'
                    })
                }
            })
         }else{
            callback(400, {
                'error': 'there is an error in your request'
            })
         }   
  
}

handler._tokens.put = (requestProperties,callback)=>{
    const id =typeof(requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 8 ? requestProperties.body.id : false;
    const extend =typeof(requestProperties.body.extend) === 'boolean' && requestProperties.body.extend === true ? requestProperties.body.extend : false;
        if(id && extend){
            //lookup the token
            data.read('tokens', id, (err, tokenData)=>{
                if(!err && tokenData){
                    const expires = Date.now() + 60 * 60 * 1000;
                    const updatedTokenObject = {
                        phone: tokenData.phone,
                        tokenId: tokenData.tokenId,
                        expires
                    }
                    //update the token
                    data.update('tokens', id, updatedTokenObject, (err)=>{
                        if(!err){
                            callback(200, updatedTokenObject);
                        }else{
                            callback(500, {
                                'error': 'could not update the token'
                            })
                        }
                    })
                }else{
                    callback(404, {
                        'error': 'token not found'
                    })
                }
            })
        }else{
            callback(400, {
                'error': 'there is an error in your request'
            })
        }
    }
    
handler._tokens.delete = (requestProperties,callback)=>{
    const id =typeof(requestProperties.queryString.id) === 'string' && requestProperties.queryString.id.trim().length === 8 ? requestProperties.queryString.id : false;
           if(id){  
               data.delete('tokens', id, (err)=>{
                   if(!err){
                       callback(200, {
                           'message': 'token was deleted successfully'
                       })
                   }else{
                       callback(500, {
                           'error': 'could not delete the token'
                       })
                   }
               })
           }else{
               callback(400, {
                   'error': 'there is an error in your request'
               })
           }     
}

handler._tokens.verify = (id, phone, callback)=>{
    //lookup the token
    data.read('tokens', id, (err, tokenData)=>{
        if(!err && tokenData){
            if(tokenData.phone === phone && tokenData.expires > Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    })
}

module.exports = handler;