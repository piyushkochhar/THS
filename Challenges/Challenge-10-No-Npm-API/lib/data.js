const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, '/../.data/');
// console.log(lib.baseDir);

// Create a new file and insert the data
lib.create = (dir, file, data, callback) => {
  fs.open(
    lib.baseDir + dir + '/' + file + '.json',
    'wx',
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        // Write to file and close
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback('Error in closing file');
              }
            });
          } else {
            callback('Error in writing to new File!');
          }
        });
      } else {
        callback('Could not create a new file,or file already exists!');
      }
    }
  );
};

// Read a file and print the data
lib.read = (dir, file, callback) => {
  fs.readFile(
    lib.baseDir + dir + '/' + file + '.json',
    'utf-8',
    (err, data) => {
      if (!err && data) {
        const parsedData = helpers.parseJsonToObject(data);
        callback(false, parsedData);
      } else {
        callback(err, data);
      }
    }
  );
};

// Update the file contents
lib.update = (dir, file, data, callback) => {
  // Open the file
  fs.open(
    lib.baseDir + dir + '/' + file + '.json',
    'r+',
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        // Truncate the file
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            // We can write to the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, () => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback('Error in closing the file!');
                  }
                });
              } else {
                callback('Error in writing the file');
              }
            });
          } else {
            callback('Error in Truncating the file!');
          }
        });
      } else {
        callback('Could not open the file for update!');
      }
    }
  );
};

// Delete the file
lib.delete = (dir, file, callback) => {
  // Unlinking or deleting
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if (!err) {
      callback(false);
    } else {
      callback('Error in deleting file');
    }
  });
};

// Read contents of  directory
lib.readAll = (dir, callback) => {
  const allUsers = [];
  fs.readdir(lib.baseDir + dir + '/', (err, files) => {
    if (!err) {
      files.forEach((file) => {
        allUsers.push(file.slice(0, -5));
      });
      callback(false, allUsers);
    } else {
      callback('Error in reading all users');
    }
  });
};

module.exports = lib;
