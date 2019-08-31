exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    var { ObjectID } = require('mongodb')

    router.post('/getAllJobs', async (req, res, ) => {

        try {
            const jobs = await app.db.models.Job.find({}).sort({ createdAt: 'desc' });

            if (!jobs.length) {
                return res.send({
                    success: false,
                    errorMessage: 'No Jobs Found'
                })
            }

            res.send({ success: true, jobs })

        } catch (err) {
            res.send({
                success: false,
                errorMessage: "Something went wrong please try again"
            })
        }


    });

    app.use('/job', router);

}

