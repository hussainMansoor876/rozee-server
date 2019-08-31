exports = module.exports = function (app, mongoose) {

  require('./home')(app, mongoose);
  require('./auth')(app, mongoose);
  require("./addJob")(app, mongoose);
  require("./applyToJob")(app, mongoose)

};
