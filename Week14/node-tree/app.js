/* Node program to print all files/folders in a directory */

const fs = require('fs');
const path = require('path');

const generateTree = (dir) => {
    // Check if directory exists
    if(!fs.existsSync(dir)){
        return `${dir} is not a valid directory`
    }
    // Get info about file/directory
    const status = fs.lstatSync(dir)

    // Every file/directory has a name property
    const obj = {
        name: path.basename(dir)
    }

    // If current name is directory recurse
    if(status.isDirectory()){
        obj.children = fs.readdirSync(dir).map(function(child) {
            return generateTree(dir + '/' + child);
        });
    }

    return obj;
}

const dirName = process.argv[2];
console.log(JSON.stringify(generateTree(dirName), null, "  "));