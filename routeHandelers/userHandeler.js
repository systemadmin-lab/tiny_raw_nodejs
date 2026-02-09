// title:user handler
// Discription:handle user related routes
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

handler._users = {};

// POST - Create User
handler._users.post = (requestProperties, callback) => {
  const first_name = typeof requestProperties.body.firstname === "string" && requestProperties.body.firstname.trim().length > 0 ? requestProperties.body.firstname : false;
  const last_name = typeof requestProperties.body.lastname === "string" && requestProperties.body.lastname.trim().length > 0 ? requestProperties.body.lastname : false;
  const phone = typeof requestProperties.body.phone === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
  const password = typeof requestProperties.body.password === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  const tosAgreement = typeof requestProperties.body.tosAgreement === "boolean" && requestProperties.body.tosAgreement === true ? requestProperties.body.tosAgreement : false;

  if (first_name && last_name && phone && password && tosAgreement) {
    data.read("users", phone, (err) => {
      if (err) {
        const userObject = { first_name, last_name, phone, password: hash(password), tosAgreement };
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, { message: "user was created successfully" });
          } else {
            callback(500, { error: "could not create user" });
          }
        });
      } else {
        callback(400, { error: "a user with that phone number already exists" });
      }
    });
  } else {
    callback(400, { error: "there is an error in your request" });
  }
};

// GET - User Data
handler._users.get = (requestProperties, callback) => {
  const phone = typeof requestProperties.queryString.phone === "string" && requestProperties.queryString.phone.trim().length === 11 ? requestProperties.queryString.phone : false;

  if (phone) {
    const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
    tokenHandeler._tokens.verify(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        data.read("users", phone, (err, udata) => {
          if (!err && udata) {
            const user = { ...udata };
            delete user.password;
            callback(200, user);
          } else {
            callback(404, { error: "user not found" });
          }
        });
      } else {
        callback(403, { error: "authentication failure" });
      }
    });
  } else {
    callback(400, { error: "Invalid phone number" });
  }
};

// PUT - Update User
handler._users.put = (requestProperties, callback) => {
  const phone = typeof requestProperties.body.phone === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;
  const first_name = typeof requestProperties.body.firstname === "string" && requestProperties.body.firstname.trim().length > 0 ? requestProperties.body.firstname : false;
  const last_name = typeof requestProperties.body.lastname === "string" && requestProperties.body.lastname.trim().length > 0 ? requestProperties.body.lastname : false;
  const password = typeof requestProperties.body.password === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

  if (phone) {
    if (first_name || last_name || password) {
      const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
      tokenHandeler._tokens.verify(token, phone, (tokenIsValid) => {
        if (tokenIsValid) {
          data.read("users", phone, (err, udata) => {
            if (!err && udata) {
              if (first_name) udata.first_name = first_name;
              if (last_name) udata.last_name = last_name;
              if (password) udata.password = hash(password);

              data.update("users", phone, udata, (err) => {
                if (!err) {
                  callback(200, { message: "user was updated successfully" });
                } else {
                  callback(500, { error: "could not update the user" });
                }
              });
            } else {
              callback(400, { error: "the specified user does not exist" });
            }
          });
        } else {
          callback(403, { error: "authentication failure" });
        }
      });
    } else {
      callback(400, { error: "Nothing to update" });
    }
  } else {
    callback(400, { error: "Invalid phone number" });
  }
};

// DELETE - Delete User
handler._users.delete = (requestProperties, callback) => {
  const phone = typeof requestProperties.queryString.phone === "string" && requestProperties.queryString.phone.trim().length === 11 ? requestProperties.queryString.phone : false;

  if (phone) {
    const token = typeof requestProperties.headersObject.token === "string" ? requestProperties.headersObject.token : false;
    tokenHandeler._tokens.verify(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, { message: "user was deleted successfully" });
          } else {
            callback(500, { error: "could not delete the user" });
          }
        });
      } else {
        callback(403, { error: "authentication failure" });
      }
    });
  } else {
    callback(400, { error: "There was a problem in your request" });
  }
};

module.exports = handler;