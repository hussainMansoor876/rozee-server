exports = module.exports = function(app, mongoose) {
    require('./mailer')(app, mongoose)
}