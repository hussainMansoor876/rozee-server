exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const { ObjectID } = require("mongodb")

    router.post('/edit', async (req, res, ) => {
        const { jobId, title, role, location, desc } = req.body;

        try {

            if (!jobId || !title || !role || !location || !desc) {
                return res.send({ success: false, message: "Please send data" })
            }

            if (!ObjectID.isValid(jobId)) {
                return res.send({ success: false, message: "Please send correct ID" })
            }

            const foundJob = await app.db.models.Job.findOne({ _id: jobId })

            if(!foundJob){
                return res.send({ success: false, message: "Cannot find job" })
            }

            const updatedJob = await app.db.models.Job.findOneAndUpdate({ _id: jobId }, {
                $set: {
                    jobTitle: title,
                    jobDescription: desc,
                    role,
                    location
                }
            }, { new: true })

            if (!updatedJob) {
                return res.send({ success: false, message: "Cannot Update Job" })

            }

            res.send({ success: true, message: "Job Updated", newJob: updatedJob })


        } catch (err) {
            res.send({ success: false, message: "Something went wrong please try again later", err: err.message })

        }

    });

    app.use('/job', router);

}

