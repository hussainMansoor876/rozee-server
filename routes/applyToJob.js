exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const multer = require('multer');
    const cloudinary = require('cloudinary')

    var storage = multer.diskStorage({
        filename: (req, file, callback) => callback(null, Date.now() + file.originalname)
    })


    var docFilter = (req, file, cb) => {
        // accept audio files only
        if (!file.originalname.match(/\.(pdf|doc|docx)$/i)) {
            req.fileError = true;
        }
        cb(null, true);
    };

    cloudinary.config({
        cloud_name: app.get('cloudinary_name'),
        api_key: app.get('cloudinary_key'),
        api_secret: app.get("cloudinary_secret")
    })


    var upload = multer({ storage: storage, fileFilter: docFilter });



    router.post('/apply', upload.single('CV'), async (req, res) => {
        
        // const { jobId, email, cv }
    });

    app.use('/job', router);

}

