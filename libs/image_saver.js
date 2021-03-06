/**
 * Created by Lich on 08.11.2016.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log('mmmmmmmmmmm', req)
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        //console.log(';;;;;;;;;;;', req);
        var match = file.originalname.match(/\.(\w+)$/);
        cb(null, file.fieldname + '-' + Date.now() + '.' + match[1])
    }
});

var fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
        //cb(new Error('I don\'t have a clue!'))
    }
}

var limits = {fileSize: 10000000};

var upload = function (req, res, next) {
    console.log('bbbbbbbbbbbbbbbbbb', req.files)
    var upload = multer({storage: storage, fileFilter: fileFilter, limits: limits});
    console.log('zzzzzzzzzzzz')
    upload.single('file')(req,res,next)
    //console.log('ooooooooooo', req)
    //var tempPath = req.files.file.path,
    //    targetPath = path.resolve('./uploads/image.png');
    //if (path.extname(req.files.file.name).toLowerCase() === '.png') {
    //    fs.rename(tempPath, targetPath, function(err) {
    //        if (err) throw err;
    //        console.log("Upload completed!");
    //    });
    //} else {
    //    fs.unlink(tempPath, function () {
    //        if (err) throw err;
    //        console.error("Only .png files are allowed!");
    //    });
    //}
    //// ...
};

var getFileDir = function () {
    return "/uploads/";
}

module.exports.upload = upload;
module.exports.getFileDir = getFileDir;