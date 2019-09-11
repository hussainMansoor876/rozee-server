exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();
    var { ObjectID } = require('mongodb')

    router.get('/getall', async (req, res, ) => {

        try {
            const CVS = await app.db.models.AllCVS.find({}).sort({ createdAt: 'desc' });

            if (!CVS.length) {
                return res.send({
                    success: false,
                    errorMessage: 'No CVS Found'
                })
            }

            res.send({ success: true, CVS })

        } catch (err) {
            res.send({
                success: false,
                errorMessage: "Something went wrong please try again"
            })
        }


    });

    app.use('/cv', router);

}

