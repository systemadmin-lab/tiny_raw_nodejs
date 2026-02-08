//dependencies
const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//write data to a file
lib.create = function (dir,file,data,callback){
    //need to notice data is. give by closure concept.[rejuan]
    //open the file for writing
    // error back pattern
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);
            //write data to file and close it
            fs.writeFile(fileDescriptor,stringData,(err)=>{
                if(!err){
                    fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing new file');
                        }
                    })
            }else{
                callback('Error writing to new file');
            }
        
            })

        }else{
            callback('Error creating new file, it may already exist');
        }

});
}
lib.read = function (dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',(err,data)=>{
        if(!err && data){
            const parsedData = JSON.parse(data);
            callback(false,parsedData);
        }else{
            callback(err,data);
        }
    })
}
lib.update = function (dir,file,data,callback){
    //open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);
            //truncate the file
            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err){
                    //write to the file and close it
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback('Error closing existing file');
                                }
                            })
                    }else{
                        callback('Error writing to existing file');
                    }
        
                    })
                }else{
                    callback('Error truncating file');
                }
            })

        }else{
            callback('Error updating. File may not exist yet');
        }

});
};
lib.delete = function (dir,file,callback){
    //unlink the file
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err)=>{
        if(!err){
            callback(false);
        }else{
            callback('Error deleting file');
        }
    })
}

module.exports = lib;