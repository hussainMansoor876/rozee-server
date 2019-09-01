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


    router.post('/apply', upload.single('CV'), async (req, res) => {

        var { candidateEmail, jobId } = req.body

        try {

            if (!candidateEmail || !jobId) {
                return res.send({ success: false, message: "Please Send Data" })
            }

            if (!ObjectID.isValid(jobId)) {
                return res.send({ success: false, message: "Please Send Correct ID" });
            }

            if (!req.file) {
                return res.send({ success: false, message: "Please Send File" })
            }

            if (req.fileError) {
                return res.send({ success: false, message: 'Wrong file selected' })
            }

            const foundJob = await app.db.models.Job.findOne({ _id: jobId })

            if (!foundJob) {
                return res.send({ success: false, message: 'No Job Found' })
            }

            var isUpdateAllowed = foundJob.CVS.every(item => candidateEmail !== item.email);

            if (!isUpdateAllowed) {
                return res.send({ success: false, message: "You have already applied on this job" })
            }

            const uploadedCV = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: "auto" })

            await app.db.models.Job.updateOne({ _id: jobId }, {
                $addToSet: { CVS: { email: candidateEmail, cvLink: uploadedCV.secure_url } }

            })
                .then(updatedJob => {
                    res.send({ success: true, message: "Applied" })
                })
                .catch(err => {
                    console.log(err.message)
                    res.send({ success: false, message: "Cannot apply to this job", err: err.message })
                })

        } catch (err) {
            res.send({ success: false, message: "Something went wrong please try again later", err: err.message })
        }

    });

    app.use('/job', router);

}

