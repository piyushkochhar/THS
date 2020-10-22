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
        obj.type = "folder"
        obj.children = fs.readdirSync(dir).map(function(child) {
            return generateTree(dir + '/' + child);
        });
    } else{
        obj.type = "file"
    }

    return obj;
}

const printTree = (tree, indent = 0) => {

    // If tree not object return.
    if(typeof tree === 'string'){
        console.log(tree+"\n");
        return;
    }

    // Get total indents
    let indents = Array(indent).fill(" ").map((v) => {
        return " |";
    }).join("") + "-";

    // check type and recurse
    if(tree.type === "folder"){
        console.log(indents + tree.name)
        if(tree.children){
            tree.children.forEach(child => {
                printTree(child,indent+1)
            });
        }
    } 
    else { 
        console.log(indents + tree.name)
    }
}

// Give input as cmd line argument
const dirName = process.argv[2];
const treeObj = generateTree(dirName);
// Uncomment to get JSON
// console.log(JSON.stringify(treeObj),null, " ")
printTree(treeObj)
