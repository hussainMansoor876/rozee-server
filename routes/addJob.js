exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    var { ObjectID } = require('mongodb')

    router.post('/addNewJob', async (req, res, ) => {
        const { posterId, jobTitle, jobDescription } = req.body

        try {
            if (!ObjectID.isValid(posterId)) {
                return res.send({ success: false, message: "Please Send Correct ID" });
            }

            const poster = await app.db.models.User.findOne({ _id: posterId });

            if (!poster) {
                return res.send({ success: false, message: "Cannot find user" })

            }

            let job = new app.db.models.Job({ posterId, jobTitle, jobDescription })

            job.save((err, newJob) => {
                if (err) {
                    return res.send({ success: false, message: "Cannot post a job", err: err.message })
                }

                res.send({ success: true, message: "Job Posted Successfully", newJob })
            })
        } catch (err) {
            res.send({ success: false, message: 'Something went wrong please try again later' })

        }

    });

    app.use('/job', router);

}

