exports = module.exports = function(app, mongoose){

    const express = require('express')
    const router = require('express').Router()

    router.post('/', async (req, res) => {
        const {name, email, phone, message } = req.body
        try{
            if(!name || !email || !phone || !message){
               return res.send("please send data")
            }
            res.send('all good')
        } catch(err){
            res.send({success: false, message:'something went wrong please try again later'})
        }
    })

    app.use('/contactUs', router)
}