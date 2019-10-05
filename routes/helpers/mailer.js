exports = module.exports = function(app, mongoose){

    var express = require('express');
    var router = express.Router();

    const sgMail = require('@sendgrid/mail');
    let sendgrid_apikey = app.get('SENDGRID_API_KEY')
    sgMail.setApiKey(sendgrid_apikey);


    router.post('/', async (req, res) => {
        console.log(app.get('SENDER_EMAIL'))
        const {name, email, phone, message } = req.body
        try{
            if(!name || !email || !phone || !message){
               return res.send("please send data")
            }

            const emailContent = {
                from: app.get('SENDER_EMAIL'),
                to: app.get('RECIEVER_EMAIL'),
                subject: "247 IT international help",
                text: "Help message to 247 IT international",
                html:`<h3>Email Address: <span> ${email} </span></h3>
                </br>
                <h3>User Name: <span> ${name} </span></h3>
                </br>
                <h3>User Phone Number: <span> ${phone} </span></h3>
                </br>
                <p> ${message}</p>` 
            };

            sgMail.send(emailContent).then(res => {
                console.log(`LogLevel1 :: Email Sent to asadiklas03@gmail.com`);
            }).catch(err => {
                console.log("Error in email sending ", err.message);
            });

            // formatTemplate = () => { 
            //     const EMAIL_TEMPLATE =            
                
            //     return EMAIL_TEMPLATE
            // }
            
            res.send({success:true, message: 'Your message is successfully submited to us'})
            
        } catch(err){
            res.send({success: false, message:'something went wrong please try again later'})
        }
    })

    app.use('/contactUs', router)
}