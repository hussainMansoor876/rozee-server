exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const multer = require('multer');
    const cloudinary = require('cloudinary')
    const { ObjectID } = require("mongodb")

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


    router.post('/upload', upload.single('CV'), async (req, res) => {

        var { candidateName } = req.body

        try {

            if (!candidateName) {
                return res.send({ success: false, message: "Please Send Data" })
            }

            if (!req.file) {
                return res.send({ success: false, message: "Please Send File" })
            }

            if (req.fileError) {
                return res.send({ success: false, message: 'Wrong file selected' })
            }

            const uploadedCV = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: "auto" })

            const saveSV = new app.db.models.AllCVS({ candidateName, cvLink: uploadedCV.secure_url })

            saveSV.save((err, doc) => {
                if (err) {
                    return res.send({ success: false, message: "Cannot save cv", err: err.message })
                }

                res.send({ success: true, message: "CV Uploaded Successfully", doc })
            })


        } catch (err) {
            res.send({ success: false, message: "Something went wrong please try again later", err: err.message })
        }

    });

    app.use('/cv', router);

}

