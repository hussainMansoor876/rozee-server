exports = module.exports = function (app, mongoose) {
    require('./user')(app, mongoose);
    require('./job')(app, mongoose);
    require('./allCVS')(app, mongoose);
}