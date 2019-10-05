exports = module.exports = function (app, mongoose) {

    var express = require('express');
    var router = express.Router();

    const sgMail = require('@sendgrid/mail');
    let sendgrid_apikey = app.get('SENDGRID_API_KEY')
    sgMail.setApiKey(sendgrid_apikey);
    const SENDER_EMAIL = "alitanveerahmad876@gmail.com";
    const RECEIVER_EMAIL = "info@247itinternational.com";


    router.post('/', async (req, res) => {
        const { name, email, phone, message } = req.body
        try {
            if (!name || !email || !phone || !message) {
                return res.send("please send data")
            }

            const emailContent = {
                from: { email: SENDER_EMAIL, name: "24/7 International" },
                to: RECEIVER_EMAIL,
                subject: "247 IT international help",
                text: "Help message to 247 IT international",
                html: `<h3>Email Address: <span> ${email} </span></h3>
                </br>
                <h3>Name: <span> ${name} </span></h3>
                </br>
                <h3>Phone Number: <span> ${phone} </span></h3>
                </br>
                <h3>Message: <span> ${message} </span></h3>`
            };

            sgMail.send(emailContent).then(res => {
                console.log(`LogLevel1 :: Email Sent to ${RECEIVER_EMAIL}`);
            }).catch(err => {
                console.log("Error in email sending ", err.message);
            });
            res.send({ success: true, message: 'Your message is successfully submited to us' })


        } catch (err) {
            res.send({ success: false, message: 'something went wrong please try again later' })
        }
    })

    app.use('/contactUs', router)
}