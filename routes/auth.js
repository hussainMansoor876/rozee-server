exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body
            const loginUser = await app.db.models.User.findOne({ email })

            console.log(loginUser)

            if (loginUser) {

                const userObj = loginUser;

                if (loginUser.password === password) {
                    return res.send({ success: true, data: userObj, message: "Login Successfully" })
                }
                return res.send({ success: false, message: "Invalid email or password" })
            }
            return res.send({ success: false, message: "Invalid email or password" })

        }
        catch (err) {
            res.send({ success: false, message: err.message })
        }
    })


    app.use('/auth', router);

}

