const fs = require('fs')

// Create Global variables for directorys 

const Dirs = fs.readdirSync(
       __baseDir, 
       {withFileTypes: true} // activate file type feature
    ).filter(
         dirent => dirent.isDirectory() && dirent.name[0] != '.' // only folders and none hiden
        ).map(
            dirent => dirent.name
            ).forEach(dirName => {
                global[`__${dirName}`] = `${__baseDir}/${dirName}/`; // create global var ("__folderName")
            });
