const _data = require('./data');
const { isValidEmail } = require('./helpers');
const helpers = require('./helpers');

// Implementing Route Handlers
const handlers = {};

handlers._users = {};
handlers._hobby = {};

// Router Handlers for /users
handlers.users = (data, callback) => {
  // When someone access /users, now we need to identify HTTP method
  const acceptableMethods = ['post', 'get', 'put', 'delete'];

  if (acceptableMethods.includes(data.method)) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405, { Error: 'invalid HTTP Method. Request Failed' });
  }
};

// Router Handlers for /hobby
handlers.hobby = (data, callback) => {
  // When someone access /hobby, now we need to identify HTTP method
  const acceptableMethods = ['put', 'delete'];
  if (acceptableMethods.includes(data.method)) {
    handlers._hobby[data.method](data, callback);
  } else {
    callback(405, { Error: 'invalid HTTP Method. Request Failed' });
  }
};

// POST method for /users
// Required Data(Users Schema) from body: firstName, lastName, phone (unique), password, tosAgreement
// Optional Data: none
handlers._users.post = (data, callback) => {
  // Implement validation, check all required fieldsare filled
  const firstName =
    typeof data.payload.firstName === 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName === 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const phone =
    typeof data.payload.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone.trim()
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    isValidEmail(data.payload.email.trim())
      ? data.payload.email.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' &&
    data.payload.password.length >= 6
      ? data.payload.password
      : false;
  const tosAgreement =
    typeof data.payload.tosAgreement === 'boolean' && data.payload.tosAgreement
      ? true
      : false;

  if (firstName && lastName && phone && password && email && tosAgreement) {
    _data.read('users', phone, (err, userData) => {
      if (err) {
        // Lets hash the password
        const hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          // Create final User Object to store in the disk
          const userObject = {
            firstName,
            lastName,
            phone,
            email,
            hashedPassword,
            id: helpers.getUniqueId(),
            tosAgreement: true,
          };

          // Save the user to disk
          _data.create('users', phone, userObject, (err) => {
            if (!err) {
              callback(200, { Success: 'User Registered Successfully' });
            } else {
              console.log(err);
              callback(500, { Error: 'Could not create new User' });
            }
          });
        } else {
          callback(500, { Error: 'Could not hash the passsword' });
        }
      } else {
        // Error user already exists
        callback(400, { Error: 'User with this phone number already exists' });
      }
    });
  } else {
    // Refactor to make error for firstName, lastName etc..
    // Hint: Make error obj & append all errors to it.
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// GET Method for /users
// Required Data (Query params): Phone number
// Optional Data: none
// It is a Private Route, only logged in users can query user data
handlers._users.get = (data, callback) => {
  // Check if phone number is valid
  const phone =
    typeof data.queryStringObject.phone === 'string' &&
    data.queryStringObject.phone.trim().length === 10
      ? data.queryStringObject.phone.trim()
      : false;

  // If phone param not available get all user data
  if (!phone) {
    // Store all user files inside in array
    const allUsers = [];
    // Counter to end the looping & sending callback
    let counter = 0;
    _data.readAll('users', (err, files) => {
      if (!err) {
        files.forEach((file, idx) => {
          _data.read('users', file, (err, data) => {
            if (!err && data) {
              // Remove the password from the data
              delete data.hashedPassword;
              // Push user data onto array
              allUsers.push(data);
              counter++;
              // Condition to send the response
              if (files.length === counter) {
                callback(200, allUsers);
              }
            } else {
              callback(400, { Error: 'User not found' });
            }
          });
        });
      } else {
        callback(400, { Error: 'Could not get users' });
      }
    });
  } else if (phone) {
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // Remove the password from the data
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(400, { Error: 'User not found' });
      }
    });
  } else {
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// PUT Method for /users
// Required Data (Body): Phone number
// Optional Data: rest of the fields
// It is a Private Route, only logged in users can update user data
handlers._users.put = (data, callback) => {
  const phone =
    typeof data.payload.phone === 'string' &&
    data.payload.phone.trim().length === 10
      ? data.payload.phone.trim()
      : false;

  // Check for optional fields
  const firstName =
    typeof data.payload.firstName === 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName === 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const password =
    typeof data.payload.password === 'string' &&
    data.payload.password.length >= 6
      ? data.payload.password
      : false;
  const email =
    typeof data.payload.email === 'string' &&
    isValidEmail(data.payload.email.trim())
      ? data.payload.email.trim()
      : false;

  if (phone) {
    if (firstName || lastName || password || email) {
      _data.read('users', phone, (err, userData) => {
        if (!err && userData) {
          // Update the fields
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password);
          }
          if (email) {
            userData.email = email;
          }

          // Store the new data to the disk into the same file
          _data.update('users', phone, userData, (err) => {
            if (!err) {
              callback(200, { Success: 'User data updated' });
            } else {
              console.error(err);
              callback(500, { Error: 'Server Error. Please Try Again' });
            }
          });
        } else {
          callback(400, { Error: 'User does not exist' });
        }
      });
    } else {
      callback(400, { Error: 'Missing fields to update' });
    }
  } else {
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// DELETE Method for /users
// Required Data (Query params): Phone number
// Optional Data: none
// It is a Private Route, only logged in users can query user data
handlers._users.delete = (data, callback) => {
  const phone =
    typeof data.queryStringObject.phone === 'string' &&
    data.queryStringObject.phone.trim().length === 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    // Look up the user
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // Delete
        _data.delete('users', phone, (err) => {
          if (!err) {
            callback(200, { Success: 'User got deleted successfully' });
          } else {
            // Always log 500 errors
            console.error(err);
            callback(500, { Error: 'Could not delete your account' });
          }
        });
      } else {
        callback(400, { Error: 'User does not exist' });
      }
    });
  } else {
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// PUT Method for /hobby
// Required Data (Query Params): Phone number
// Required Data (Body): hobby
// Optional Data: none
// It is a Private Route, only logged in users can add hobbies to user data
handlers._hobby.put = (data, callback) => {
  // Check if hobby is valid
  const hobby =
    typeof data.payload.hobby === 'string' &&
    data.payload.hobby.trim().length > 0
      ? data.payload.hobby.trim()
      : false;

  // Check if phone number is valid
  const phone =
    typeof data.queryStringObject.phone === 'string' &&
    data.queryStringObject.phone.trim().length === 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone && hobby) {
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // If hobby not available on user's object
        if (!data.hobby) {
          data.hobby = [hobby];
        } else {
          // Check if hobby already existss
          if (!data.hobby.includes(hobby)) {
            data.hobby.push(hobby);
            // Store the hobbies to the disk into the same file
            _data.update('users', phone, data, (err) => {
              if (!err) {
                callback(200, { Success: 'User hobbies updated' });
              } else {
                console.error(err);
                callback(500, { Error: 'Server Error. Please Try Again' });
              }
            });
          } else {
            callback(400, { Error: 'Hobby already exists' });
          }
        }
      } else {
        callback(400, { Error: 'User does not exist' });
      }
    });
  } else {
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// DELETE Method for /hobby
// Required Data (Query params): Phone number
// Required Data (Body): hobby
// Optional Data: none
// It is a Private Route, only logged in users can query hobbies of user data
handlers._hobby.delete = (data, callback) => {
  // Check if hobby is valid
  const hobby =
    typeof data.payload.hobby === 'string' &&
    data.payload.hobby.trim().length > 0
      ? data.payload.hobby.trim()
      : false;

  // Check if phone number is valid
  const phone =
    typeof data.queryStringObject.phone === 'string' &&
    data.queryStringObject.phone.trim().length === 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone && hobby) {
    // Look up the user
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // Delete hobby
        if (data.hobby.includes(hobby)) {
          data.hobby = data.hobby.filter((userHobby) => userHobby !== hobby);
          // Store the hobbies to the disk into the same file
          _data.update('users', phone, data, (err) => {
            if (!err) {
              callback(200, { Success: 'User hobbies updated' });
            } else {
              console.error(err);
              callback(500, { Error: 'Server Error. Please Try Again' });
            }
          });
        } else {
          callback(400, { Error: 'Hobby does not exist' });
        }
      } else {
        callback(400, { Error: 'User does not exist' });
      }
    });
  } else {
    callback(400, { Error: 'Validation failed/missing fields' });
  }
};

// Router Handlers for /age
handlers.age = (data, callback) => {
  // When someone access /age, now we need to identify HTTP method
  const acceptableMethods = ['get'];

  if (acceptableMethods.includes(data.method)) {
    // Check if phone number is valid
    const phone =
      typeof data.queryStringObject.phone === 'string' &&
      data.queryStringObject.phone.trim().length === 10
        ? data.queryStringObject.phone.trim()
        : false;

    // If phone param available get user's time from id
    if (phone) {
      _data.read('users', phone, (err, userData) => {
        if (!err && data) {
          const startTime = userData.id;
          const endTime = parseInt(process.uptime());
          let totalSeconds = endTime - startTime;

          const years = Math.floor(totalSeconds / 31536000);
          totalSeconds %= 31536000;
          const months = Math.floor(totalSeconds / 2592000);
          totalSeconds %= 2592000;
          const days = Math.floor(totalSeconds / 86400);
          totalSeconds %= 86400;
          const hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          callback(200, {
            Success: `User's Age: ${years} Years, ${months} Months ${days} Days ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`,
          });
        } else {
          callback(400, { Error: 'User does not exist' });
        }
      });
    } else {
      callback(400, { Error: 'Validation failed/missing fields' });
    }
  } else {
    callback(405, { Error: 'invalid HTTP Method. Request Failed' });
  }
};

handlers.ping = (data, callback) => {
  // Callback returns http status code and payload
  callback(200, { success: 'You just accessed /ping' });
};

handlers.notFound = (data, callback) => {
  callback(404, { status: 'Not Found' });
};

module.exports = handlers;
