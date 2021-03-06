exports = module.exports = function (app, mongoose) {

  require('./home')(app, mongoose);
  require('./auth')(app, mongoose);
  require("./addJob")(app, mongoose);
  require("./applyToJob")(app, mongoose)
  require('./getJobs')(app, mongoose)
  require('./getSingleJob')(app, mongoose)
  require('./updateJob')(app, mongoose);
  require('./uploadCV')(app, mongoose)
  require('./getAllCV')(app, mongoose)
  require('./helpers')(app, mongoose)
};
