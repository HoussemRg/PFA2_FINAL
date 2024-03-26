const multer=require('multer');


const uploadFile=multer({
    storage:multer.memoryStorage(),
    fileFilter:(req,file,callback)=>{
        if(file.mimetype ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            callback(null,true);
        } 
        else {
            callback({ message: "Only XLSX files are allowed" })
        }
    },
    limits:{fileSize:30 * 1024 * 1024}
})

module.exports=uploadFile