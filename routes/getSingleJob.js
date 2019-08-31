exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    const { ObjectID } = require('mongodb')

    router.post('/getPostedJobs', async (req, res, ) => {

        const { posterId } = req.body

        try {
            if (!ObjectID.isValid(posterId)) {
                return res.send({ success: false, message: "Please Send Correct ID" });
            }

            const jobs = await app.db.models.Job.find({ posterId })

            if (!jobs.length) {
                return res.send({
                    success: false,
                    message: 'No Jobs Found'
                })
            }
            res.send({ success: true, jobs })


        } catch (err) {
            res.send({ success: false, message: 'Something went wrong please try again later' })
        }
    });

    app.use('/job', router);

}

