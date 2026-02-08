// title:utilites
// Discription:handle various utilities functions
// Author:Rejuan_Anik

//scaholding
const utilities = {};

utilities.parseJson = (jsonString)=>{
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }
    return output;
}

module.exports = utilities;