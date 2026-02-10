// title:check handler
// Discription:handle check related routes
// Author:Rejuan_Anik

//dependencies
const data = require("../lib/data");
const { hash } = require("../helpers/utilities");
const tokenHandeler = require("./tokenHandeler");

// module scafholding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

// POST - Create Check
handler._check.post = (requestProperties, callback) => {
  //validate inputs
  let protcol = typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
    ? requestProperties.body.protocol
    : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["get", "post", "put", "delete"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array &&
    requestProperties.body.successCodes.length > 0
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (protcol && url && method && successCodes && timeoutSeconds) {
    //verify token
    let token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;

    //lookup the user phone by reading the token
    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        let userPhone = tokenData.phone;

        //lookup the user data
        data.read("users", userPhone, (err, userData) => {
          if (!err && userData) {
            tokenHandeler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                //create a random id for check
                let checkId = Math.random().toString(36).substring(2, 10);

                //create check object
                let checkObject = {
                  id: checkId,
                  userPhone: userPhone,
                  protocol: protcol,
                  url: url,
                  method: method,
                  successCodes: successCodes,
                  timeoutSeconds: timeoutSeconds,
                };

                //save the object
                data.create("checks", checkId, checkObject, (err) => {
                  if (!err) {
                    callback(200, checkObject);
                  } else {
                    callback(500, { error: "Could not create the new check" });
                  }
                });
              } else {
                callback(403, { error: "Authentication failed" });
              }
            });
          } else {
            callback(403, { error: "User not found" });
          }
        });
      } else {
        callback(403, { error: "Authentication failed" });  

  
};

// GET - Check Data
handler._check.get = (requestProperties, callback) => {
  
 
};

// PUT - Update Check
handler._check.put = (requestProperties, callback) => {
   

  
};

// DELETE - Delete Check
handler._check.delete = (requestProperties, callback) => {
 

  
};

module.exports = handler;