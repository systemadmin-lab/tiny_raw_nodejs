// title:utilites
// Discription:handle various utilities functions
// Author:Rejuan_Anik

//scaholding
const utilities = {};
const crypto = require('crypto');

utilities.parseJson = (jsonString)=>{
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }
    return output;
}
utilities.hash = (str)=>{
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', 'thisIsASecretKey').update(str).digest('hex');
        return hash;
    }else{
        return false;
    }
}

module.exports = utilities;