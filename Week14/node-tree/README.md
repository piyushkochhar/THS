# Display directory tree

Display all the files and folder inside a directory as a tree.

## Installation


```bash
npm i
```

## Usage

```node
npm start your_dir_name
```

## Directory Tree JSON
```json
{
 "name": "dir1",
 "type": "folder",
 "children": [
  {
   "name": "abc.txt",
   "type": "file"
  },
  {
   "name": "dir2",
   "type": "folder",
   "children": [
    {
     "name": "file1.txt",
     "type": "file"
    },
    {
     "name": "file2.txt",
     "type": "file"
    }
   ]
  },
  {
   "name": "dir3",
   "type": "folder",
   "children": [
    {
     "name": "dir4",
     "type": "folder",
     "children": [
      {
       "name": "file4.txt",
       "type": "file"
      }
     ]
    },
    {
     "name": "file3.txt",
     "type": "file"
    }
   ]
  },
  {
   "name": "file0.txt",
   "type": "file"
  }
 ]
}
```

## Directory Tree Printed
```js
-dir1
 |-abc.txt
 |-dir2
 | |-file1.txt
 | |-file2.txt
 |-dir3
 | |-dir4
 | | |-file4.txt
 | |-file3.txt
 |-file0.txt
```
